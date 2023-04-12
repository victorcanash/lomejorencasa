import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';
import { StaticImageData } from 'next/image';

import type { Product, ProductInventory, ProductPack, ListProductReviews } from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { 
  convertToProduct,
  getProductImgUrl as getProductImgUrlMW, 
  getAllProductImgsUrl as getAllProductImgsUrlMW,
} from '@core/utils/products';

import { pages } from '@lib/constants/navigation';
import { productIds } from '@lib/constants/products';
import { everfreshImgIds, bagsImgIds, placeholderImgId } from '@lib/constants/multimedia';

type ProductsContext = {
  everfreshProduct: Product | undefined,
  bagsProduct: Product | undefined,
  initProducts: (newProducts: Product[], newPacks: ProductPack[]) => void,
  isEverfreshProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  isBagsProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  getProductPageUrl: (item: Product | CartItem | GuestCartCheckItem) => string,
  getProductImgUrl: (item: Product | CartItem | GuestCartCheckItem, index?: number) => string | StaticImageData,
  getProductDetailImgsUrl: (item: Product | CartItem | GuestCartCheckItem) => string[] | StaticImageData[],
  getProductPacks: (product: Product) => ProductPack[],
  getProductInventory: (id: number) => ProductInventory | undefined,
  getProductPack: (id: number) => ProductPack | undefined,
  productVariants: (ProductInventory | ProductPack)[],
  listProductReviews: ListProductReviews,
  setListProductReviews: Dispatch<SetStateAction<ListProductReviews>>,
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
  getProductPacks: () => [],
  getProductInventory: () => undefined,
  getProductPack: () => undefined,
  productVariants: [],
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
  const [everfreshProduct, setEverfreshProduct] = useState<Product | undefined>(undefined);
  const [bagsProduct, setBagsProduct] = useState<Product | undefined>(undefined);
  const [everfreshPacks, setEverfreshPacks] = useState<ProductPack[]>([]);
  const [bagsPacks, setBagsPacks] = useState<ProductPack[]>([]);
  const [productVariants, setProductVariants] = useState<(ProductInventory | ProductPack)[]>([]);
  const [listProductReviews, setListProductReviews] = useState<ListProductReviews>({
    reviews: [],
    totalPages: 1,
    currentPage: 0,
  });

  const isEverfreshProduct = useCallback((item: Product | ProductPack | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product?.id === productIds.everfresh) {
      return true;
    }
    return false;
  }, []);

  const isBagsProduct = useCallback((item: Product | ProductPack | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product?.id === productIds.bags) {
      return true;
    }
    return false;
  }, []);

  const initProducts = useCallback((products: Product[], packs: ProductPack[]) => {
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
  }, [isBagsProduct, isEverfreshProduct]);

  const getProductPageUrl = useCallback((item: Product | CartItem | GuestCartCheckItem) => {
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
  }, [isBagsProduct, isEverfreshProduct]);
  
  const getProductImgUrl = useCallback((item: Product | CartItem | GuestCartCheckItem, index = 0) => {
    const product = convertToProduct(item);
    if (product) {
      if (isEverfreshProduct(product)) {
        return everfreshImgIds[0];
      } else if (isBagsProduct(product)) {
        return bagsImgIds[0];
      }
      return getProductImgUrlMW(product, index) || placeholderImgId;
    }
    return placeholderImgId;
  }, [isBagsProduct, isEverfreshProduct]);
  
  const getProductDetailImgsUrl = useCallback((item: Product | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product) {
      if (isEverfreshProduct(product)) {
        return everfreshImgIds;
      } else if (isBagsProduct(product)) {
        return bagsImgIds;
      }
      const imgsUrl = getAllProductImgsUrlMW(product);
      return imgsUrl.length >= 1 ? imgsUrl : [placeholderImgId]
    }
    return [placeholderImgId];
  }, [isBagsProduct, isEverfreshProduct]);

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
  }, [bagsPacks, everfreshPacks, isBagsProduct, isEverfreshProduct]);

  const getProductInventory = useCallback((id: number) => {
    const everfreshInventories = everfreshProduct?.inventories || [];
    const bagsInventories = bagsProduct?.inventories || [];
    const inventories = everfreshInventories.concat(bagsInventories);
    return inventories.find(item => item.id === id);
  }, [bagsProduct?.inventories, everfreshProduct?.inventories]);

  const getProductPack = useCallback((id: number) => {
    const packs = getProductPacks();
    return packs.find(item => item.id === id);
  }, [getProductPacks]);

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
        getProductPacks,
        getProductInventory,
        getProductPack,
        productVariants,
        listProductReviews,
        setListProductReviews,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
