import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect, useRef } from 'react';

import { useSnackbar } from 'notistack';

import { Cart, CartItem } from '@core/types/cart';
import { Product, ProductInventory } from '@core/types/products';
import { createCartItem, updateCartItem, deleteCartItem } from '@core/utils/cart';
import { useAppContext } from '@lib/contexts/AppContext';
import useAuth from '@lib/hooks/useAuth';

type ContextType = {
  cart?: Cart,
  setCart: Dispatch<SetStateAction<Cart | undefined>>,
  quantity: number,
  addCartItem: (product: Product, inventory: ProductInventory) => void,
  updateCartItemQuantity: (cartItemId: number, quantity: number) => void,
};

export const CartContext = createContext<ContextType>({
  cart: undefined,
  setCart: () => {},
  quantity: 0,
  addCartItem: () => {},
  updateCartItemQuantity: () => {},
});

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Error while reading cart context');
  }

  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const firstRenderRef = useRef(true);

  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [quantity, setQuantity] = useState(0);

  const { token } = useAppContext();

  const { isLogged } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const addCartItem = (product: Product, inventory: ProductInventory) => {
    if (!isLogged() || !cart) {
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
        addCartItemSuccess();
      }).catch((error: Error) => {
        addCartItemError();
      });

    // Create cart item
    } else {
      createCartItem(token, cartItem).then((response: { cartItem: CartItem }) => {
        cart.items.push(response.cartItem);
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
    if (!isLogged() || !cart || cartItemId < 0) {
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
      const quantityAdded = quantity - cartItem.quantity;
      cartItem.quantity = quantity;
      updateCartItem(token, cartItem).then((response: { cartItem: CartItem }) => {
        cart.items[cartItemIndex] = response.cartItem;
        updateCartItemSuccess(quantityAdded);
      }).catch((error: Error) => {
        // Show popup error
      });

    // Delete cart item
    } else {
      deleteCartItem(token, cartItem.id).then(() => {
        cart.items.splice(cartItemIndex);
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
        if (!cart || !cart.items || cart.items.length < 1) {
          return result;
        }
        cart.items.forEach((item) => {
          result += item.quantity;
        })
        return result;
      }
      setQuantity(getQuantity());
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ 
        cart,
        setCart,
        quantity,
        addCartItem,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
