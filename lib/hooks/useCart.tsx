import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import { pages } from '@core/config/navigation.config';
import { ManageActions } from '@core/constants/auth';
import { maxQuantity } from '@core/constants/cart';
import type { Cart, CartItem } from '@core/types/cart';
import type { ProductInventory } from '@core/types/products';
import { manageCartItem, checkCart as checkCartMW } from '@core/utils/cart';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useCart = () => {
  const { setLoading } = useAppContext();
  const { token, isLogged } = useAuthContext();
  const { cart, initCart, totalQuantity, setTotalQuantity, totalPrice, setTotalPrice } = useCartContext();

  const router = useRouter();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const addCartItem = (inventory: ProductInventory) => {
    if (!isLogged() || !cart) {
      router.push(pages.login.path);
      return;
    };

    if (totalQuantity + 1 > maxQuantity) {
      onMaxCartQuantityError();
      return;
    }

    setLoading(true);

    const cartItem = {
      id: 0,
      cartId: cart.id,
      inventoryId: inventory.id,
      inventory: inventory,
      quantity: 1
    } as CartItem;

    let cartItemIndex = -1;
    cart.items.forEach((item, index) => {
      if (item.inventoryId === inventory.id) {
        cartItemIndex = index;
        cartItem.id = item.id;
        cartItem.quantity = item.quantity + 1;
        return;
      };
    });

    // Update cart item
    if (cartItemIndex > -1) {
      manageCartItem(ManageActions.update, token, cartItem)
        .then((_response: { cartItem: CartItem }) => {
          cart.items[cartItemIndex] = cartItem;
          onAddCartItemSuccess(inventory.realPrice);
        }).catch((_error: Error) => {
          onAddCartItemError();
        });

    // Create cart item
    } else {
      manageCartItem(ManageActions.create, token, cartItem)
        .then((response: { cartItem: CartItem }) => {
          cartItem.id = response.cartItem.id;
          cart.items.push(cartItem);
          onAddCartItemSuccess(inventory.realPrice);
        }).catch((_error: Error) => {
          onAddCartItemError();
        });
    };
  };

  const onAddCartItemSuccess = (itemPrice: number) => {
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + itemPrice);
    setLoading(false);
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.successes.add' }), 
      { variant: 'success' }
    );
  };

  const onAddCartItemError = () => {
    setLoading(false);
    enqueueSnackbar(
      intl.formatMessage({ id: 'cart.errors.add' }), 
      { variant: 'error' }
    );
  };

  const updateCartItemQuantity = async (cartItem: CartItem, quantity: number, forceUpdate = false) => {
    if (!isLogged() || !cart) {
      router.push(pages.login.path);
      return;
    };

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
      const addedPrice = cartItem.inventory.realPrice * addedQuantity;
      cartItem.quantity = quantity;
      manageCartItem(ManageActions.update, token, cartItem)
        .then((_response: { cartItem: CartItem }) => {
          cart.items[cartItemIndex] = cartItem;
          onUpdateCartItemSuccess(addedQuantity, addedPrice);
        }).catch((_error: Error) => {
          onUpdateCartItemError();
        });

    // Delete cart item
    } else {
      const addedQuantity = -cartItem.quantity;
      const addedPrice = -(cartItem.inventory.realPrice * cartItem.quantity);
      manageCartItem(ManageActions.delete, token, cartItem)
        .then(() => {
          cart.items.splice(cartItemIndex, 1);
          onUpdateCartItemSuccess(addedQuantity, addedPrice);
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
    if (!cart) {
      return;
    }
    setLoading(true);
    checkCartMW(token, cart)
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
