import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { StaticImageData } from 'next/image';

import type { Product, ProductInventory, ProductPack } from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { 
  convertToProduct,
  getProductImgUrl as getProductImgUrlMW, 
  getAllProductImgsUrl as getAllProductImgsUrlMW,
} from '@core/utils/products';

import { pages } from '@lib/constants/navigation';
import { productIds } from '@lib/constants/products'
import placeholder from 'public/images/placeholder.jpeg';
import detail_everfresh1 from 'public/images/everfresh/everfresh1.jpg';
import detail_everfresh2 from 'public/images/everfresh/everfresh2.jpg';
import detail_everfresh3 from 'public/images/everfresh/everfresh3.jpg';
import detail_everfresh4 from 'public/images/everfresh/everfresh4.jpg';
import detail_bags1 from 'public/images/bags/bags1.jpg';
import detail_bags2 from 'public/images/bags/bags2.jpg';
import detail_bags3 from 'public/images/bags/bags3.jpg';
import banner_everfresh1 from 'public/images/banner/everfresh1.jpg';
import banner_everfresh2 from 'public/images/banner/everfresh2.jpg';
import banner_everfresh3 from 'public/images/banner/everfresh3.jpg';
import banner_everfresh4 from 'public/images/banner/everfresh4.jpg';

type ProductsContext = {
  everfreshProduct: Product | undefined,
  bagsProduct: Product | undefined,
  initProducts: (newProducts: Product[], newPacks: ProductPack[]) => void,
  isEverfreshProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  isBagsProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  getProductPageUrl: (item: Product | CartItem | GuestCartCheckItem) => string,
  getProductImgUrl: (item: Product | CartItem | GuestCartCheckItem, index?: number) => string | StaticImageData,
  getProductDetailImgsUrl: (item: Product | CartItem | GuestCartCheckItem) => string[] | StaticImageData[],
  getProductBannerImgsUrl: () => StaticImageData[],
  getProductPacks: (product: Product) => ProductPack[],
  productVariants: (ProductInventory | ProductPack)[],
};

const ProductsContext = createContext<ProductsContext>({
  everfreshProduct: undefined,
  bagsProduct: undefined,
  initProducts: () => {},
  isEverfreshProduct: () => false,
  isBagsProduct: () => false,
  getProductPageUrl: () => '',
  getProductImgUrl: () => '',
  getProductDetailImgsUrl: () => [],
  getProductBannerImgsUrl: () => [],
  getProductPacks: () => [],
  productVariants: [],
});

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('Error while reading ProductsContext');
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [everfreshProduct, setEverfreshProduct] = useState<Product | undefined>(undefined);
  const [bagsProduct, setBagsProduct] = useState<Product | undefined>(undefined);
  const [everfreshPacks, setEverfreshPacks] = useState<ProductPack[]>([]);
  const [bagsPacks, setBagsPacks] = useState<ProductPack[]>([]);
  const [productVariants, setProductVariants] = useState<(ProductInventory | ProductPack)[]>([]);

  const initProducts = (products: Product[], packs: ProductPack[]) => {
    products.forEach((item) => {
      if (isEverfreshProduct(item)) {
        setEverfreshProduct(item);
      } else if (isBagsProduct(item)) {
        setBagsProduct(item);
      }
    });
    packs.forEach((item) => {
      if (isEverfreshProduct(item)) {
        setEverfreshPacks(current => [...current, item]);
      }
      if (isBagsProduct(item)) {
        setBagsPacks(current => [...current, item]);
      }
    });
  };

  const isEverfreshProduct = (item: Product | ProductPack | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product?.id === productIds.everfresh) {
      return true;
    }
    return false;
  };
  
  const isBagsProduct = (item: Product | ProductPack | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product?.id === productIds.bags) {
      return true;
    }
    return false;
  };

  const getProductPageUrl = (item: Product | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product) {
      if (isEverfreshProduct(product)) {
        return `${pages.everfresh.path}`;
      } else if (isBagsProduct(product)) {
        return `${pages.bags.path}`;
      }
      return `${pages.productDetail.path}/${product.name.current}?id=${product.id}`;
    }
    return pages.productList.path;
  };
  
  const getProductImgUrl = (item: Product | CartItem | GuestCartCheckItem, index = 0) => {
    const product = convertToProduct(item);
    if (product) {
      if (isEverfreshProduct(product)) {
        return detail_everfresh1;
      } else if (isBagsProduct(product)) {
        return detail_bags1;
      }
      return getProductImgUrlMW(product, index) || placeholder;
    }
    return placeholder;
  };
  
  const getProductDetailImgsUrl = (item: Product | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product) {
      if (isEverfreshProduct(product)) {
        return [
          detail_everfresh1, 
          detail_everfresh2, 
          detail_everfresh3, 
          detail_everfresh4
        ];
      } else if (isBagsProduct(product)) {
        return [
          detail_bags1, 
          detail_bags2, 
          detail_bags3
        ];
      }
      const imgsUrl = getAllProductImgsUrlMW(product);
      return imgsUrl.length >= 1 ? imgsUrl : [placeholder]
    }
    return [placeholder];
  };
  
  const getProductBannerImgsUrl = () => {
    return [
      banner_everfresh1, 
      banner_everfresh2, 
      banner_everfresh3, 
      banner_everfresh4
    ];
  };

  const getProductPacks = useCallback((product?: Product) => {
    if (product) {
      if (isEverfreshProduct(product)) {
        return everfreshPacks;
      } else if (isBagsProduct(product)) {
        return bagsPacks;
      }
      return [];
    }
    return everfreshPacks.concat(bagsPacks);
  }, [bagsPacks, everfreshPacks]);

  useEffect(() => {
    const everfreshInventories = everfreshProduct?.inventories || [];
    const bagsInventories = bagsProduct?.inventories || [];
    const inventories = everfreshInventories.concat(bagsInventories);
    const packs = getProductPacks();
    let variants: (ProductInventory | ProductPack)[] = [];
    variants = variants.concat(inventories, packs);
    setProductVariants(variants);
  }, [bagsProduct?.inventories, everfreshProduct?.inventories, getProductPacks]);

  return (
    <ProductsContext.Provider
      value={{
        everfreshProduct,
        bagsProduct,
        initProducts,
        isEverfreshProduct,
        isBagsProduct,
        getProductPageUrl,
        getProductImgUrl,
        getProductDetailImgsUrl,
        getProductBannerImgsUrl,
        getProductPacks,
        productVariants,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
