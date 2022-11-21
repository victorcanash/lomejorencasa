import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import type { Cart } from '@core/types/cart';

type ContextType = {
  cart?: Cart,
  totalQuantity: number,
  setTotalQuantity: Dispatch<SetStateAction<number>>,
  totalPrice: number,
  setTotalPrice: Dispatch<SetStateAction<number>>,
  initCart: (cart: Cart) => void,
  removeCart: () => void,
};

export const CartContext = createContext<ContextType>({
  cart: undefined,
  totalQuantity: 0,
  setTotalQuantity: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  initCart: () => {},
  removeCart: () => {},
});

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Error while reading CartContext');
  }

  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const initCartQuantity = (cart: Cart) => {
    let result = 0;
    if (cart && cart.items && cart.items.length >= 1) {
      cart.items.forEach((item) => {
        result += item.quantity;
      });
    }
    setTotalQuantity(result);
  };
  const initCartPrice = (cart: Cart) => {
    let result = 0;
    if (cart && cart.items && cart.items.length >= 1) {
      cart.items.forEach((item) => {
        result += item.inventory.realPrice * item.quantity;
      });
    }
    setTotalPrice(result);
  };

  const initCart = (cart: Cart) => {
    setCart(cart);
    initCartQuantity(cart);
    initCartPrice(cart);
  };

  const removeCart = () => {
    setCart(undefined);
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  return (
    <CartContext.Provider
      value={{ 
        cart,
        totalQuantity,
        setTotalQuantity,
        totalPrice,
        setTotalPrice,
        initCart,
        removeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
