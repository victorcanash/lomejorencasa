import {
  createContext,
  useContext,
  useCallback,
} from 'react';

import type {
  Landing,
  ProductPack,
  ProductInventory,
  ProductCategory,
  ProductCategoryGroup,
  Product,
} from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';

import { pages } from '@lib/config/navigation.config';
import { placeholderSrc } from '@lib/config/multimedia.config';

type ProductsContext = {
  getItemPath: (item: ProductCategory | ProductCategoryGroup | Landing | CartItem | GuestCartCheckItem) => string,
  getItemImgUrl: (item: ProductCategory | Landing | CartItem | GuestCartCheckItem) => string,
  getLandingImgsUrl: (landing: Landing, selectedItem: ProductPack | ProductInventory | undefined) => string[],
  getLandingItems: (landing: Landing) => (ProductPack | ProductInventory)[],
  getFirstLandingItem: (landing: Landing) => ProductPack | ProductInventory | undefined,
  getProductPriceData: (product: Product | ProductInventory | ProductPack) => { price: number, originPrice: number },
};

const ProductsContext = createContext<ProductsContext>({
  getItemPath: () => '',
  getItemImgUrl: () => '',
  getLandingImgsUrl: () => [],
  getLandingItems: () => [],
  getFirstLandingItem: () => undefined,
  getProductPriceData: () => ({} as { price: number, originPrice: number }),
});

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('Error while reading ProductsContext');
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const getItemPath = useCallback((item: ProductCategory | ProductCategoryGroup | Landing | CartItem | GuestCartCheckItem) => {
    if ((item as ProductCategory | ProductCategoryGroup | Landing)?.slug) {
      if ((item as Landing)?.images) {
        return `/productos/${(item as Landing).slug}`;
      } else {
        return `/colecciones/${(item as ProductCategory | ProductCategoryGroup).slug}`;
      }
    } else if ((item as CartItem | GuestCartCheckItem)?.inventory?.product?.landing) {
      return `/productos/${(item as CartItem | GuestCartCheckItem).inventory?.product?.landing?.slug}`;
    } else if ((item as CartItem | GuestCartCheckItem)?.pack?.landing) {
      return `/productos/${(item as CartItem | GuestCartCheckItem).pack?.landing?.slug}`;
    }
    return pages.home.path;
  }, []);
  
  const getItemImgUrl = useCallback((item: ProductCategory | Landing | CartItem | GuestCartCheckItem) => {
    let imgUrl = placeholderSrc;
    if ((item as Landing)?.products) {
      imgUrl = (item as Landing).images[0];
    } else {
      const cartItem = item as CartItem | GuestCartCheckItem;
      if (cartItem.inventory?.image) {
        imgUrl = cartItem.inventory.image;
      } else if (cartItem.pack?.image) {
        imgUrl = cartItem.pack.image;
      } else if ((item as ProductCategory).image) {
        imgUrl = (item as ProductCategory).image || '';
      }
    }
    return imgUrl;
  }, []);
  
  const getLandingImgsUrl = useCallback((landing: Landing, selectedItem: ProductPack | ProductInventory | undefined) => {
    const images: string[] = [];
    if (selectedItem?.image) {
      images.push(selectedItem.image)
    }
    if (landing.images.length > 0) {
      landing.images.forEach((image) => {
        images.push(image);
      });
    } else if (!selectedItem?.image) {
      images.push(placeholderSrc);
    }
    return images
  }, []);

  const getLandingItems = useCallback((landing: Landing) => {
    let landingItems: (ProductInventory | ProductPack)[] = [];
    if (landing.products.length > 0) {
      const landingInventories = landing.products[0].inventories;
      if (landingInventories && landingInventories.length > 0) {
        landingItems = landingInventories;
      }
    } else if (landing.packs.length > 0) {
      landingItems = landing.packs;
    }
    return landingItems;
  }, []);

  const getFirstLandingItem = useCallback((landing: Landing) => {
    const landingItems = getLandingItems(landing);
    if (landingItems.length > 0) {
      return landingItems[0];
    }
    return undefined;
  }, [getLandingItems]);

  const getProductPriceData = (product: Product | ProductInventory | ProductPack) => {
    let price = 0;
    let originPrice = 0;
    if ((product as Product)?.lowestPrice) {
      price = (product as Product).lowestRealPrice;
      originPrice = (product as Product).lowestPrice;
    } else if ((product as ProductInventory)?.realPrice) {
      price = (product as ProductInventory).realPrice;
      originPrice = (product as ProductInventory).price;
    } else if ((product as ProductPack)?.originalPrice) {
      price = (product as ProductPack).price;
      originPrice = (product as ProductPack).originalPrice;
    }
    return {
      price,
      originPrice,
    };
  };

  return (
    <ProductsContext.Provider
      value={{
        getItemPath,
        getItemImgUrl,
        getLandingImgsUrl,
        getLandingItems,
        getFirstLandingItem,
        getProductPriceData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
