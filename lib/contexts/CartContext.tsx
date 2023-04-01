import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import envConfig from '@core/config/env.config';
import { Environments } from '@core/constants/app';
import type { Cart } from '@core/types/cart';
import { itemTotalPriceNumber } from '@core/utils/cart';

type ContextType = {
  cart: Cart,
  totalQuantity: number,
  setTotalQuantity: Dispatch<SetStateAction<number>>,
  totalPrice: number,
  setTotalPrice: Dispatch<SetStateAction<number>>,
  initCart: (cart: Cart) => void,
  cleanCart: () => void,
  removeCart: () => void,
  disabledCheckoutPage: () => boolean,
};

export const CartContext = createContext<ContextType>({
  cart: {
    id: -1,
    userId: -1,
    items: [],
  },
  totalQuantity: 0,
  setTotalQuantity: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
  initCart: () => {},
  cleanCart: () => {},
  removeCart: () => {},
  disabledCheckoutPage: () => true,
});

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Error while reading CartContext');
  }

  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    id: -1,
    userId: -1,
    items: [],
  });
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
        result += itemTotalPriceNumber(item);
      });
    }
    setTotalPrice(result);
  };

  const initCart = (cart: Cart) => {
    setCart(cart);
    initCartQuantity(cart);
    initCartPrice(cart);
  };

  const cleanCart = () => {
    setCart({
      ...cart,
      items: [],
    })
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  const removeCart = () => {
    setCart({
      id: -1,
      userId: -1,
      items: [],
    });
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  const disabledCheckoutPage = () => {
    if (envConfig.NEXT_PUBLIC_APP_ENV === Environments.development) {
      return true;
    } else if (totalPrice <= 0) {
      return true;
    }
    return false;
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
        cleanCart,
        removeCart,
        disabledCheckoutPage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
