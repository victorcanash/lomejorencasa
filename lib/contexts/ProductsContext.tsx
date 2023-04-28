import {
  createContext,
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';

import { allLandingConfigs } from '@lib/constants/products';
import type {
  ListProductReviews,
  Landing,
  Product,
} from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import {
  generateLandings,
  getFirstLandingItem,
  getLandingConfigByCartItem,
  getLandingConfigByPath,
  getLandingPathByConfig,
} from '@core/utils/products';

import { pages } from '@lib/constants/navigation';
import { placeholderImgId } from '@lib/constants/multimedia';

type ProductsContext = {
  initLandings: (landings: Landing[]) => void,
  getLandingByPath: (path: string) => Landing | undefined,
  getAllProducts: () => Product[],
  getCartItemPageUrl: (item: CartItem | GuestCartCheckItem) => string,
  getItemImgUrl: (item: Landing | CartItem | GuestCartCheckItem) => string,
  getLandingImgsUrl: (landing: Landing) => string[],
  listProductReviews: ListProductReviews,
  setListProductReviews: Dispatch<SetStateAction<ListProductReviews>>,
};

const ProductsContext = createContext<ProductsContext>({
  initLandings: () => {},
  getLandingByPath: () => undefined,
  getAllProducts: () => [],
  getCartItemPageUrl: () => '',
  getItemImgUrl: () => '',
  getLandingImgsUrl: () => [],
  listProductReviews: {} as ListProductReviews,
  setListProductReviews: () => {},
});

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('Error while reading ProductsContext');
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [landings, setLandings] = useState<Landing[]>(generateLandings(allLandingConfigs));
  const [listProductReviews, setListProductReviews] = useState<ListProductReviews>({
    reviews: [],
    totalPages: 1,
    currentPage: 0,
  });

  const initLandings = useCallback((landings: Landing[]) => {
    setLandings(landings);
  }, []);

  const getLandingByPath = useCallback((path: string) => {
    let foundLanding: Landing | undefined = undefined;
    const foundLandingConfig = getLandingConfigByPath(path, allLandingConfigs);
    if (foundLandingConfig) {
      foundLanding = landings.find((landing) => {
        if (landing.id === foundLandingConfig.id) {
          return landing;
        }
      });
    }
    return foundLanding;
  }, [landings]);

  const getAllProducts = useCallback(() => {
    return landings.filter((item) => item.products.length > 0).map((item) => {
      return item.products[0];
    })
  }, [landings]);

  const getCartItemPageUrl = useCallback((item: CartItem | GuestCartCheckItem) => {
    const foundLandingConfig = getLandingConfigByCartItem(item, allLandingConfigs);
    return foundLandingConfig ?
      getLandingPathByConfig(foundLandingConfig) : pages.productList.path;
  }, []);
  
  const getItemImgUrl = useCallback((item: Landing | CartItem | GuestCartCheckItem) => {
    let imgUrl = placeholderImgId;
    if ((item as Landing)?.products) {
      const landingItem = getFirstLandingItem(item as Landing);
      if (landingItem?.image) {
        imgUrl = landingItem.image;
      }
    } else {
      const cartItem = item as CartItem | GuestCartCheckItem;
      if (cartItem.inventory?.image) {
        imgUrl = cartItem.inventory.image;
      } else if (cartItem.pack?.image) {
        imgUrl = cartItem.pack.image;
      }
    }
    return imgUrl;
  }, []);
  
  const getLandingImgsUrl = useCallback((landing: Landing) => {
    if (landing.images.length > 0) {
      return landing.images;
    }
    return [placeholderImgId];
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        initLandings,
        getLandingByPath,
        getAllProducts,
        getCartItemPageUrl,
        getItemImgUrl,
        getLandingImgsUrl,
        listProductReviews,
        setListProductReviews,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
