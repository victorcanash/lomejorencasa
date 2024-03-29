import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import NP from 'number-precision'

import envConfig from '@core/config/env.config';
import { Environments } from '@core/constants/app';
import type { Cart } from '@core/types/cart';
import { getItemAmount } from '@core/utils/cart';

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
  drawerOpen: boolean,
  handleDrawerOpen: () => void,
  closeDrawer: () => void,
  openDrawer: () => void,
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
  drawerOpen: false,
  handleDrawerOpen: () => {},
  closeDrawer: () => {},
  openDrawer: () => {},
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const openDrawer  = () => {
    if (!drawerOpen) {
      setDrawerOpen(true);
    }
  };

  const initCart = useCallback((cart: Cart) => {
    setCart(cart);
  }, []);

  const cleanCart = () => {
    setCart({
      ...cart,
      items: [],
    })
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  const removeCart = useCallback(() => {
    setCart({
      id: -1,
      userId: -1,
      items: [],
    });
    setTotalQuantity(0);
    setTotalPrice(0);
  }, []);

  const disabledCheckoutPage = useCallback(() => {
    if (envConfig.APP_ENV === Environments.development) {
      return true;
    } else if (totalPrice <= 0) {
      return true;
    }
    return false;
  }, [totalPrice]);

  useEffect(() => {
    let totalPriceResult = 0;
    let totalQuantityResult = 0;
    if (cart.items.length > 0) {
      cart.items.forEach((item) => {
        totalPriceResult = NP.plus(totalPriceResult, getItemAmount(item).itemTotalWithQuantity)
        totalQuantityResult = NP.plus(totalQuantityResult, item.quantity)
      });
    }
    setTotalPrice(totalPriceResult);
    setTotalQuantity(totalQuantityResult);
  }, [cart, cart.items, cart.items.length]);

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
        drawerOpen,
        handleDrawerOpen,
        closeDrawer,
        openDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
