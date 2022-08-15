import { useState, useRef, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { CartItem } from '@core/types/cart';
import { Product, ProductInventory } from '@core/types/products';
import { createCartItem, updateCartItem, deleteCartItem } from '@core/utils/cart';
import { useAppContext } from '@lib/contexts/AppContext';
import useAuth from '@lib/hooks/useAuth';

const useCart = () => {
  const { token, user } = useAppContext();

  const firstRenderRef = useRef(true);

  const { isLogged } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const [quantity, setQuantity] = useState(0);

  const addCartItem = (product: Product, inventory: ProductInventory) => {
    if (!isLogged() || !user) {
      return;
    };

    const cartItem = {
      id: 0,
      cartId: user.cart.id,
      productId: product.id,
      inventoryId: inventory.id,
      product: product,
      inventory: inventory,
      quantity: 1
    } as CartItem;

    let cartItemIndex = -1;
    user.cart.items.forEach((item, index) => {
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
        user.cart.items[cartItemIndex] = response.cartItem;
        addCartItemSuccess();
      }).catch((error: Error) => {
        addCartItemError();
      });

    // Create cart item
    } else {
      createCartItem(token, cartItem).then((response: { cartItem: CartItem }) => {
        user.cart.items.push(response.cartItem);
        addCartItemSuccess();
      }).catch((error: Error) => {
        addCartItemError();
      });
    };
  };

  const addCartItemSuccess = () => {
    setQuantity(quantity + 1);
    enqueueSnackbar('Added to the cart', { variant: 'success' });
  };

  const addCartItemError = () => {
    enqueueSnackbar('Failed adding to the cart, try again', { variant: 'error' });
  };

  const updateCartItemQuantity = (cartItemId: number, quantity: number) => {
    if (!isLogged() || !user || cartItemId < 0) {
      return;
    };

    let cartItemIndex = -1;
    user.cart.items.forEach((item, index) => {
      if (item.id === cartItemId) {
        cartItemIndex = index;
        return;
      }
    });
    if (cartItemIndex <= -1) {
      return;
    };
    
    const cartItem = user.cart.items[cartItemIndex];
    if (cartItem.quantity == quantity) {
      return;
    };

    // Update cart item
    if (cartItem.quantity > 0) {
      const quantityAdded = quantity - cartItem.quantity;
      cartItem.quantity = quantity;
      updateCartItem(token, cartItem).then((response: { cartItem: CartItem }) => {
        user.cart.items[cartItemIndex] = response.cartItem;
        updateCartItemSuccess(quantityAdded);
      }).catch((error: Error) => {
        // Show popup error
      });

    // Delete cart item
    } else {
      deleteCartItem(token, cartItem.id).then(() => {
        user.cart.items.splice(cartItemIndex);
        updateCartItemSuccess(-cartItem.quantity);
      }).catch((error: Error) => {
        // Show popup error
      });
    };
  };

  const updateCartItemSuccess = (addedQuantity: number) => {
    setQuantity(quantity + addedQuantity);
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      const getQuantity = () => {
        let result = 0;
        if (!user || !token || !user.cart.items || user.cart.items.length < 1) {
          return result;
        }
        user.cart.items.forEach((item) => {
          result += item.quantity;
        })
        return result;
      }
      setQuantity(getQuantity());
    };
  }, [token, user]);

  return {
    addCartItem,
    updateCartItemQuantity,
    quantity
  };
};

export default useCart;
