import {
  createContext,
  useRef,
  useContext,
  useCallback,
} from 'react';

import { allLandingConfigs } from '@lib/config/inventory.config';
import type {
  Landing,
  Product,
  ProductPack,
  ProductInventory,
} from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import {
  generateLandings,
  getLandingConfigByCartItem,
  getLandingConfigById,
  getLandingConfigByPath,
  getLandingPathByConfig,
} from '@core/utils/products';

import { pages } from '@lib/config/navigation.config';
import { placeholderImgId } from '@lib/constants/multimedia';

type ProductsContext = {
  getAllLandings: () => Landing[],
  initLandings: (newLandings: Landing[]) => void,
  getLandingByPath: (path: string) => Landing | undefined,
  getLandingById: (id: number) => Landing | undefined,
  getAllProducts: () => Product[],
  getAllPacks: () => ProductPack[],
  getAllLandingsProducts: () => (ProductPack | Product)[],
  getPageUrlByCartItem: (item: CartItem | GuestCartCheckItem) => string,
  getPageUrlByLandingId: (landingId: number) => string,
  getItemImgUrl: (item: Landing | CartItem | GuestCartCheckItem) => string,
  getLandingImgsUrl: (landing: Landing, selectedItem: ProductPack | ProductInventory | undefined) => string[],
  setProductRating: (product: Product, rating: string, reviewsCount: number) => void,
  setPackRating: (pack: ProductPack, rating: string, reviewsCount: number) => void,
};

const ProductsContext = createContext<ProductsContext>({
  getAllLandings: () => [],
  initLandings: () => {},
  getLandingByPath: () => undefined,
  getLandingById: () => undefined,
  getAllProducts: () => [],
  getAllPacks: () => [],
  getAllLandingsProducts: () => [],
  getPageUrlByCartItem: () => '',
  getPageUrlByLandingId: () => '',
  getItemImgUrl: () => '',
  getLandingImgsUrl: () => [],
  setProductRating: () => {},
  setPackRating: () => {},
});

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('Error while reading ProductsContext');
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const landings = useRef<Landing[]>(generateLandings(allLandingConfigs));

  const getAllLandings = useCallback(() => {
    return landings.current;
  }, []);

  const initLandings = useCallback((newLandings: Landing[]) => {
    landings.current = newLandings;
  }, []);

  const getLandingByPath = useCallback((path: string) => {
    let foundLanding: Landing | undefined = undefined;
    const foundLandingConfig = getLandingConfigByPath(path, allLandingConfigs);
    if (foundLandingConfig) {
      foundLanding = landings.current.find((landing) => {
        if (landing.id === foundLandingConfig.id) {
          return landing;
        }
      });
    }
    return foundLanding;
  }, [landings]);

  const getLandingById = useCallback((id: number) => {
    let foundLanding: Landing | undefined = undefined;
    foundLanding = landings.current.find((landing) => {
      if (landing.id === id) {
        return landing;
      }
    });
    return foundLanding;
  }, [landings]);

  const getAllProducts = useCallback(() => {
    return landings.current.filter((item) => item.products.length > 0).map((item) => {
      return item.products[0];
    })
  }, [landings]);

  const getAllPacks = useCallback(() => {
    return landings.current.filter((item) => item.packs.length > 0).map((item) => {
      return item.packs[0];
    })
  }, [landings]);

  const getAllLandingsProducts = useCallback(() => {
    let landingsProducts: (Product | ProductPack)[] = getAllProducts();
    landingsProducts = landingsProducts.concat(getAllPacks());
    return landingsProducts;
  }, [getAllPacks, getAllProducts]);

  const getPageUrlByCartItem = useCallback((item: CartItem | GuestCartCheckItem) => {
    const foundLandingConfig = getLandingConfigByCartItem(item, allLandingConfigs);
    return foundLandingConfig ?
      getLandingPathByConfig(foundLandingConfig) : pages.productList.path;
  }, []);

  const getPageUrlByLandingId = useCallback((landingId: number) => {
    const foundLandingConfig = getLandingConfigById(landingId, allLandingConfigs);
    return foundLandingConfig ?
      getLandingPathByConfig(foundLandingConfig) : pages.productList.path;
  }, []);
  
  const getItemImgUrl = useCallback((item: Landing | CartItem | GuestCartCheckItem) => {
    let imgUrl = placeholderImgId;
    if ((item as Landing)?.products) {
      imgUrl = (item as Landing).images[0];
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
  
  const getLandingImgsUrl = useCallback((landing: Landing, selectedItem: ProductPack | ProductInventory | undefined) => {
    if (landing.images.length > 0) {
      return landing.images.map((image, index) => {
        if (index === 0) {
          return selectedItem?.image || image;
        }
        return image;
      });
    }
    return [placeholderImgId];
  }, []);

  const setProductRating = useCallback((product: Product, rating: string, reviewsCount: number) => {
    const oldLandings = [...landings.current];
    let foundLanding: Landing | undefined = undefined;
    let foundLandingIndex = -1;
    for (let i = 0; i < oldLandings.length; i++) {
      if (oldLandings[i].products.length > 0 && oldLandings[i].products[0].id === product.id) {
        foundLanding = {...oldLandings[i]};
        foundLandingIndex = i;
        foundLanding.products[0].rating = rating;
        foundLanding.products[0].reviewsCount = reviewsCount;
        break;
      }
    }
    if (!foundLanding) {
      return;
    }
    oldLandings[foundLandingIndex] = foundLanding;
    landings.current = [...oldLandings];
  }, [landings]);

  const setPackRating = useCallback((pack: ProductPack, rating: string, reviewsCount: number) => {
    const oldLandings = [...landings.current];
    let foundLanding: Landing | undefined = undefined;
    let foundLandingIndex = -1;
    for (let i = 0; i < oldLandings.length; i++) {
      if (oldLandings[i].packs.length > 0 && oldLandings[i].packs[0].id === pack.id) {
        foundLanding = {...oldLandings[i]};
        foundLandingIndex = i;
        foundLanding.packs[0].rating = rating;
        foundLanding.packs[0].reviewsCount = reviewsCount;
        break;
      }
    }
    if (!foundLanding) {
      return;
    }
    oldLandings[foundLandingIndex] = foundLanding;
    landings.current = [...oldLandings];
  }, [landings]);

  return (
    <ProductsContext.Provider
      value={{
        getAllLandings,
        initLandings,
        getLandingByPath,
        getLandingById,
        getAllProducts,
        getAllPacks,
        getAllLandingsProducts,
        getPageUrlByCartItem,
        getPageUrlByLandingId,
        getItemImgUrl,
        getLandingImgsUrl,
        setProductRating,
        setPackRating,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
