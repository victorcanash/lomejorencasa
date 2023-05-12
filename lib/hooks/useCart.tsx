import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import { ManageActions } from '@core/constants/app';
import { maxQuantity } from '@core/constants/cart';
import type { Cart, CartItem } from '@core/types/cart';
import type { ProductInventory, ProductPack } from '@core/types/products';
import {
  manageCartItem,
  checkCart as checkCartMW,
  getItemAmount,
} from '@core/utils/cart';

import { pages } from '@lib/constants/navigation';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';
import useFacebook from '@lib/hooks/useFacebook';

const useCart = () => {
  const { setLoading } = useAppContext();
  const { token, isLogged } = useAuthContext();
  const {
    cart,
    initCart,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
    openDrawer,
  } = useCartContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const { sendAddToCartEvent } = useFacebook();

  const addCartItem = (productItem: ProductInventory | ProductPack, quantity: number, goToCheckout?: boolean) => {
    if (totalQuantity + quantity > maxQuantity) {
      onMaxCartQuantityError();
      return;
    }
    setLoading(true);

    sendAddToCartEvent(productItem, quantity);

    const cartItem = {
      id: 0,
      cartId: cart.id,
      inventoryId: (productItem as ProductInventory)?.sku ? productItem.id : undefined,
      packId: (productItem as ProductInventory)?.sku ? undefined : productItem.id,
      inventory: (productItem as ProductInventory)?.sku ? productItem : undefined,
      pack: (productItem as ProductInventory)?.sku ? undefined : productItem,
      quantity: quantity,
    } as CartItem;

    let cartItemIndex = -1;
    cart.items.forEach((item, index) => {
      if (((productItem as ProductInventory)?.sku && item.inventoryId === productItem.id) ||
          ((productItem as ProductPack)?.inventories && item.packId === productItem.id)) {
        cartItemIndex = index;
        cartItem.id = item.id;
        cartItem.quantity += item.quantity;
        return;
      }
    });

    const itemAmount = getItemAmount(cartItem, quantity);
    // Update cart item
    if (cartItemIndex > -1) {
      manageCartItem(ManageActions.update, token, cart, cartItem)
        .then((_response: { cartItem: CartItem }) => {
          cart.items[cartItemIndex] = cartItem;
          onAddCartItemSuccess(quantity, itemAmount.itemTotalWithQuantity, goToCheckout);
        }).catch((_error: Error) => {
          onAddCartItemError();
        });

    // Create cart item
    } else {
      manageCartItem(ManageActions.create, token, cart, cartItem)
        .then((response: { cartItem: CartItem }) => {
          cartItem.id = response.cartItem.id;
          cart.items.push(cartItem);
          onAddCartItemSuccess(quantity, itemAmount.itemTotalWithQuantity, goToCheckout);
        }).catch((_error: Error) => {
          onAddCartItemError();
        });
    };
  };

  const onAddCartItemSuccess = (quantity: number, itemPrice: number, goToCheckout?: boolean) => {
    setTotalQuantity(totalQuantity + quantity);
    setTotalPrice(totalPrice + itemPrice);
    if (!goToCheckout) {
      setLoading(false);
      openDrawer();
    } else {
      router.push(pages.checkout.path);
    }
  };

  const onAddCartItemError = () => {
    setLoading(false);
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.add' }), 
      { variant: 'error' }
    );
  };

  const updateCartItemQuantity = async (cartItem: CartItem, quantity: number, forceUpdate = false) => {
    if (cartItem.quantity == quantity && !forceUpdate) {
      return;
    };
    if (((totalQuantity - cartItem.quantity) + quantity > maxQuantity) && 
        (cartItem.quantity < quantity)) {
      onMaxCartQuantityError();
      return;
    }
    setLoading(true);

    const cartItemIndex = cart.items.indexOf(cartItem);

    // Update cart item
    if (quantity > 0) {
      const addedQuantity = quantity - cartItem.quantity;
      const itemAmount = getItemAmount(cartItem, addedQuantity);
      cartItem.quantity = quantity;
      manageCartItem(ManageActions.update, token, cart, cartItem)
        .then((_response: { cartItem: CartItem }) => {
          cart.items[cartItemIndex] = cartItem;
          onUpdateCartItemSuccess(addedQuantity, itemAmount.itemTotalWithQuantity);
        }).catch((_error: Error) => {
          onUpdateCartItemError();
        });

    // Delete cart item
    } else {
      const addedQuantity = -cartItem.quantity;
      const itemAmount = getItemAmount(cartItem, addedQuantity);
      manageCartItem(ManageActions.delete, token, cart, cartItem)
        .then((_response: { cartItem: CartItem }) => {
          cart.items.splice(cartItemIndex, 1);
          onUpdateCartItemSuccess(addedQuantity, itemAmount.itemTotalWithQuantity);
        }).catch((_error: Error) => {
          onUpdateCartItemError();
        });
    };
  };

  const onUpdateCartItemSuccess = (addedQuantity: number, addedPrice: number) => {
    setTotalPrice(totalPrice + addedPrice);
    setTotalQuantity(totalQuantity + addedQuantity);
    setLoading(false);
  };

  const onUpdateCartItemError = () => {
    setLoading(false);
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.update' }), 
      { variant: 'error' }
    );
  };

  const checkCart = async (onSuccess?: (changedCart: boolean, changedItemsByInventory: CartItem[]) => void) => {
    setLoading(true);
    checkCartMW(isLogged() ? token : undefined, cart)
      .then((response: {cart: Cart, changedItemsByInventory: CartItem[]}) => {
        onCheckCartSuccess(response.cart, response.changedItemsByInventory, onSuccess);
      }).catch((_error: Error) => {
        onCheckCartError();
      });
  };

  const onCheckCartSuccess = (newCart: Cart, changedItemsByInventory: CartItem[], onSuccess?: (changedCart: boolean, changedItemsByInventory: CartItem[]) => void) => {
    const diffCarts = cart?.items.filter(item => {
      return !newCart.items.some(newItem => {
        return (
          newItem.id === item.id &&
          newItem.quantity === item.quantity
        );
      });
    });
    let changedCart = false;
    if ((diffCarts && diffCarts.length > 0) || 
        (cart && cart.items.length != newCart.items.length)) {
      changedCart = true;
    } 

    initCart(newCart);
    if (onSuccess) {
      onSuccess(changedCart, changedItemsByInventory);
    }
  };

  const onCheckCartError = () => {
    setLoading(false);
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.check' }), 
      { variant: 'error' }
    );
  };

  const onMaxCartQuantityError = () => {
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.maxQuantity' }), 
      { variant: 'error' }
    );
  };

  return {
    addCartItem,
    updateCartItemQuantity,
    checkCart,
  };
};

export default useCart;
