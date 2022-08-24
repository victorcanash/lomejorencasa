import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';

import type { User } from '@core/types/auth';
import type { ProductCategory } from '@core/types/products';
import type { Cart } from '@core/types/cart';
import { getCredentials } from '@core/utils/auth';
import { getAllProductCategories, getProductPrice } from '@core/utils/products';

type ContextType = {
  initialized: boolean,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  token: string,
  setToken: Dispatch<SetStateAction<string>>,
  user?: User,
  setUser: Dispatch<SetStateAction<User | undefined>>,
  categories: ProductCategory[],
  cart?: Cart,
  setCart: Dispatch<SetStateAction<Cart | undefined>>,
  cartQuantity: number,
  setCartQuantity: Dispatch<SetStateAction<number>>,
  initCart: (cart: Cart) => void,
  removeCart: () => void,
  cartPrice: number,
  setCartPrice: Dispatch<SetStateAction<number>>,
  previousPath: string | undefined,
};

export const AppContext = createContext<ContextType>({
  initialized: false,
  loading: true,
  setLoading: () => {},
  token: '',
  setToken: () => {},
  user: undefined,
  setUser: () => {},
  categories: [],
  cart: undefined,
  setCart: () => {},
  cartQuantity: 0,
  setCartQuantity: () => {},
  initCart: () => {},
  removeCart: () => {},
  cartPrice: 0,
  setCartPrice: () => {},
  previousPath: undefined,
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error while reading app context');
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const firstRenderRef = useRef(false);

  const router = useRouter();

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);
  const previousPathRef = useRef<string | undefined>(undefined);

  const initCartQuantity = (cart: Cart) => {
    let result = 0;
    if (cart && cart.items && cart.items.length >= 1) {
      cart.items.forEach((item) => {
        result += item.quantity;
      });
    }
    setCartQuantity(result);
  };
  const initCartPrice = (cart: Cart) => {
    let result = 0;
    if (cart && cart.items && cart.items.length >= 1) {
      cart.items.forEach((item) => {
        result += getProductPrice(item.product) * item.quantity;
      });
    }
    setCartPrice(result);
  };

  const initCart = useCallback((cart: Cart) => {
    setCart(cart);
    initCartQuantity(cart);
    initCartPrice(cart);
  }, []);

  const removeCart = () => {
    setCart(undefined);
    setCartQuantity(0);
    setCartPrice(0);
  };

  useEffect(() => {
    if (!firstRenderRef.current) {
      firstRenderRef.current = true;

      const initData = async() => {
        await getCredentials().then((response: {token: string, user: User, cart: Cart}) => {
          setToken(response.token);
          setUser(response.user);
          initCart(response.cart);
        }).catch((error: Error) => {
        }); 

        await getAllProductCategories().then((response: {productCategories: ProductCategory[]}) => {
          setCategories(response.productCategories);
          setInitialized(true);
        }).catch((error: Error) => {
          throw error;
        });
      };  

      initData();
    }    
  }, [initCart]);

  useEffect(() => {
    previousPathRef.current = router.asPath;
  }, [router.asPath])

  return (
    <AppContext.Provider
      value={{ 
        initialized,
        loading, 
        setLoading, 
        token, 
        setToken, 
        user, 
        setUser,
        categories,
        cart,
        setCart,
        cartQuantity,
        setCartQuantity,
        cartPrice,
        setCartPrice,
        initCart,
        removeCart,
        previousPath: previousPathRef.current,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
