import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { RouterPaths } from '@core/constants/navigation';
import { CartItem } from '@core/types/cart';
import { Product, ProductInventory } from '@core/types/products';
import { createCartItem, updateCartItem, deleteCartItem } from '@core/utils/cart';
import { getProductPrice } from '@core/utils/products';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useCartContext } from '@lib/contexts/CartContext';

const useCart = () => {
  const { token, isLogged } = useAuthContext();
  const { cart, totalQuantity, setTotalQuantity, totalPrice, setTotalPrice } = useCartContext();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const addCartItem = (product: Product, inventory: ProductInventory) => {
    if (!isLogged() || !cart) {
      router.push(RouterPaths.login);
      return;
    };

    const cartItem = {
      id: 0,
      cartId: cart.id,
      productId: product.id,
      inventoryId: inventory.id,
      product: product,
      inventory: inventory,
      quantity: 1
    } as CartItem;

    const itemPrice = getProductPrice(product);

    let cartItemIndex = -1;
    cart.items.forEach((item, index) => {
      if (item.productId === product.id && item.inventoryId === inventory.id) {
        cartItemIndex = index;
        cartItem.id = item.productId;
        cartItem.quantity = item.quantity + 1;
        return;
      };
    });

    // Update cart item
    if (cartItemIndex > -1) {
      updateCartItem(token, cartItem).then((response: { cartItem: CartItem }) => {
        cart.items[cartItemIndex] = response.cartItem;
        addCartItemSuccess(itemPrice);
      }).catch((error: Error) => {
        addCartItemError();
      });

    // Create cart item
    } else {
      createCartItem(token, cartItem).then((response: { cartItem: CartItem }) => {
        cart.items.push(response.cartItem);
        addCartItemSuccess(itemPrice);
      }).catch((error: Error) => {
        addCartItemError();
      });
    };
  };

  const addCartItemSuccess = (itemPrice: number) => {
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + itemPrice);
    enqueueSnackbar('Added to the cart', { variant: 'success' });
  };

  const addCartItemError = () => {
    enqueueSnackbar('Failed adding to the cart, try again', { variant: 'error' });
  };

  const updateCartItemQuantity = (cartItemId: number, quantity: number) => {
    if (!isLogged() || !cart) {
      router.push(RouterPaths.login);
      return;
    };

    let cartItemIndex = -1;
    cart.items.forEach((item, index) => {
      if (item.id === cartItemId) {
        cartItemIndex = index;
        return;
      }
    });
    if (cartItemIndex <= -1) {
      return;
    };
    
    const cartItem = cart.items[cartItemIndex];
    if (cartItem.quantity == quantity) {
      return;
    };

    // Update cart item
    if (cartItem.quantity > 0) {
      const addedQuantity = quantity - cartItem.quantity;
      const addedPrice = getProductPrice(cartItem.product) * addedQuantity;
      cartItem.quantity = quantity;
      updateCartItem(token, cartItem).then((response: { cartItem: CartItem }) => {
        cart.items[cartItemIndex] = response.cartItem;
        updateCartItemSuccess(addedQuantity, addedPrice);
      }).catch((error: Error) => {
        updateCartItemError();
      });

    // Delete cart item
    } else {
      const addedQuantity = -cartItem.quantity;
      const addedPrice = -(getProductPrice(cartItem.product) * cartItem.quantity);
      deleteCartItem(token, cartItem.id).then(() => {
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
  };

  const updateCartItemError = () => {
    enqueueSnackbar('Failed updating the cart, try again', { variant: 'error' });
  };

  return {
    addCartItem,
    updateCartItemQuantity
  };
};

export default useCart;
