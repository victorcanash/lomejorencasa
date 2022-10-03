import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { pages } from '@core/config/navigation.config';
import { ManageActions } from '@core/constants/auth';
import { CartItem } from '@core/types/cart';
import { Product, ProductInventory } from '@core/types/products';
import { manageCartItem } from '@core/utils/cart';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useCart = () => {
  const { setLoading } = useAppContext();
  const { token, isLogged } = useAuthContext();
  const { cart, totalQuantity, setTotalQuantity, totalPrice, setTotalPrice } = useCartContext();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const addCartItem = (product: Product, inventory: ProductInventory) => {
    if (!isLogged() || !cart) {
      router.push(pages.login.path);
      return;
    };
    setLoading(true);

    const cartItem = {
      id: 0,
      cartId: cart.id,
      productId: product.id,
      inventoryId: inventory.id,
      product: product,
      inventory: inventory,
      quantity: 1
    } as CartItem;

    let cartItemIndex = -1;
    cart.items.forEach((item, index) => {
      if (item.productId === product.id && item.inventoryId === inventory.id) {
        cartItemIndex = index;
        cartItem.id = item.id;
        cartItem.quantity = item.quantity + 1;
        return;
      };
    });

    // Update cart item
    if (cartItemIndex > -1) {
      manageCartItem(ManageActions.update, token, cartItem).then((response: { cartItem: CartItem }) => {
        cart.items[cartItemIndex] = cartItem;
        addCartItemSuccess(product.realPrice);
      }).catch((error: Error) => {
        addCartItemError();
      });

    // Create cart item
    } else {
      manageCartItem(ManageActions.create, token, cartItem).then((response: { cartItem: CartItem }) => {
        cartItem.id = response.cartItem.id;
        cart.items.push(cartItem);
        addCartItemSuccess(product.realPrice);
      }).catch((error: Error) => {
        addCartItemError();
      });
    };
  };

  const addCartItemSuccess = (itemPrice: number) => {
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + itemPrice);
    setLoading(false);
    enqueueSnackbar('Added to the cart', { variant: 'success' });
  };

  const addCartItemError = () => {
    setLoading(false);
    enqueueSnackbar('Failed adding to the cart, try again', { variant: 'error' });
  };

  const updateCartItemQuantity = async (cartItem: CartItem, quantity: number) => {
    if (!isLogged() || !cart) {
      router.push(pages.login.path);
      return;
    };
    if (cartItem.quantity == quantity) {
      return;
    };
    setLoading(true);

    const cartItemIndex = cart.items.indexOf(cartItem);

    // Update cart item
    if (quantity > 0) {
      const addedQuantity = quantity - cartItem.quantity;
      const addedPrice = cartItem.product.realPrice * addedQuantity;
      cartItem.quantity = quantity;
      manageCartItem(ManageActions.update, token, cartItem).then((response: { cartItem: CartItem }) => {
        cart.items[cartItemIndex] = cartItem;
        updateCartItemSuccess(addedQuantity, addedPrice);
      }).catch((error: Error) => {
        updateCartItemError();
      });

    // Delete cart item
    } else {
      const addedQuantity = -cartItem.quantity;
      const addedPrice = -(cartItem.product.realPrice * cartItem.quantity);
      manageCartItem(ManageActions.delete, token, cartItem).then(() => {
        cart.items.splice(cartItemIndex);
        updateCartItemSuccess(addedQuantity, addedPrice);
      }).catch((error: Error) => {
        updateCartItemError();
      });
    };
  };

  const updateCartItemSuccess = (addedQuantity: number, addedPrice: number) => {
    setTotalPrice(totalPrice + addedPrice);
    setTotalQuantity(totalQuantity + addedQuantity);
    setLoading(false);
  };

  const updateCartItemError = () => {
    setLoading(false);
    enqueueSnackbar('Failed updating the cart, try again', { variant: 'error' });
  };

  return {
    addCartItem,
    updateCartItemQuantity
  };
};

export default useCart;
