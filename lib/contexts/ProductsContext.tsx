import {
  createContext,
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';

import NP from 'number-precision';

import type {
  Product,
  ProductInventory,
  ProductPack,
  ListProductReviews,
} from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { 
  convertToProduct,
  getProductImgUrl as getProductImgUrlMW, 
  getAllProductImgsUrl as getAllProductImgsUrlMW,
  convertToProductPack,
} from '@core/utils/products';

import { pages } from '@lib/constants/navigation';
import { productIds, packIds } from '@lib/constants/products';
import {
  everfreshImgIds,
  bagsImgIds,
  placeholderImgId,
  everfreshPackImgIds,
  bagsPackImgIds,
} from '@lib/constants/multimedia';

type ProductsContext = {
  everfreshProduct: Product,
  bagsProduct: Product,
  initProducts: (newProducts: Product[], newPacks: ProductPack[]) => void,
  isEverfreshProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  isBagsProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  getProductPageUrl: (item: Product | CartItem | GuestCartCheckItem) => string,
  getProductImgUrl: (item: Product | CartItem | GuestCartCheckItem, index?: number) => string,
  getCartItemImgUrl: (item: CartItem | GuestCartCheckItem) => string,
  getProductDetailImgsUrl: (item: Product | CartItem | GuestCartCheckItem) => string[],
  getProductInventories: (product?: Product) => ProductInventory[],
  getProductPacks: (product?: Product) => ProductPack[],
  getProductVariants: (product?: Product) => (ProductInventory | ProductPack)[],
  getBagsPack: (inventory: ProductInventory) => ProductPack | undefined,
  getProductInventory: (id: number) => ProductInventory | undefined,
  getProductPack: (id: number) => ProductPack | undefined,
  getProductRating: (product?: Product) => {
    rating: number;
    reviewsCount: number;
  },
  listProductReviews: ListProductReviews,
  setListProductReviews: Dispatch<SetStateAction<ListProductReviews>>,
};

const ProductsContext = createContext<ProductsContext>({
  everfreshProduct: {} as Product,
  bagsProduct: {} as Product,
  initProducts: () => {},
  isEverfreshProduct: () => false,
  isBagsProduct: () => false,
  getProductPageUrl: () => '',
  getProductImgUrl: () => '',
  getCartItemImgUrl: () => '',
  getProductDetailImgsUrl: () => [],
  getProductInventories: () => [],
  getProductPacks: () => [],
  getProductVariants: () => [],
  getBagsPack: () => undefined,
  getProductInventory: () => undefined,
  getProductPack: () => undefined,
  getProductRating: () => { return { rating: 0, reviewsCount: 0 } },
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
  const [everfreshProduct, setEverfreshProduct] = useState<Product>({
    id: 1,
    categoryId: 1,
    name: {
      en: 'Everfresh vacuum machine',
      es: 'Envasadora al vacío Everfresh',
      current: 'Envasadora al vacío Everfresh',
    },
    description: {
      en: 'Everfresh vacuum machine',
      es: 'Envasadora al vacío Everfresh',
      current: 'Envasadora al vacío Everfresh',
    },
    lowestPrice: 22.65,
    lowestRealPrice: 22.65,
    imageNames: [],
    inventories: [
      {
        id: 1,
        productId: 1,
        sku: '',
        name: {
          en: 'Everfresh vacuum machine',
          es: 'Envasadora al vacío Everfresh',
          current: 'Envasadora al vacío Everfresh',
        },
        description: {
          en: 'Everfresh vacuum machine',
          es: 'Envasadora al vacío Everfresh',
          current: 'Envasadora al vacío Everfresh',
        },
        price: 22.65,
        quantity: 1,
        realPrice: 22.65,
        bigbuy: {
          id: '',
          name: '',
          description: '',
          price: 0,
          quantity: 1,
        },
        product: {} as Product,
        rating: '0',
        reviewsCount: 0,
      },
    ],
    discounts: undefined,
    activeDiscount: undefined,
  });
  const [bagsProduct, setBagsProduct] = useState<Product>({
    id: 3,
    categoryId: 2,
    name: {
      en: 'Box of 10 vacuum bags with valve',
      es: 'Paquete de 10 bolsas de vacío con válvula',
      current: 'Paquete de 10 bolsas de vacío con válvula',
    },
    description: {
      en: 'Box of 10 vacuum bags with valve',
      es: 'Paquete de 10 bolsas de vacío con válvula',
      current: 'Paquete de 10 bolsas de vacío con válvula',
    },
    lowestPrice: 14.59,
    lowestRealPrice: 14.59,
    imageNames: [],
    inventories: [
      {
        id: 6,
        productId: 3,
        sku: '',
        name: {
          en: 'Box of 10 vacuum bags with valve (22cm x 21cm)',
          es: 'Paquete de 10 bolsas de vacío con válvula (22cm x 21cm)',
          current: 'Paquete de 10 bolsas de vacío con válvula (22cm x 21cm)',
        },
        description: {
          en: 'Box of 10 vacuum bags with valve (22cm x 21cm)',
          es: 'Paquete de 10 bolsas de vacío con válvula (22cm x 21cm)',
          current: 'Paquete de 10 bolsas de vacío con válvula (22cm x 21cm)',
        },
        price: 14.59,
        quantity: 1,
        realPrice: 14.59,
        bigbuy: {
          id: '',
          name: '',
          description: '',
          price: 0,
          quantity: 1,
        },
        product: {} as Product,
        rating: '0',
        reviewsCount: 0,
      },
    ],
    discounts: undefined,
    activeDiscount: undefined,
  });
  const [everfreshPacks, setEverfreshPacks] = useState<ProductPack[]>([]);
  const [bagsPacks, setBagsPacks] = useState<ProductPack[]>([]);
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

  const isEverfreshPack = useCallback((item: ProductPack | CartItem | GuestCartCheckItem) => {
    const productPack = convertToProductPack(item);
    if (productPack?.id === packIds.everfresh) {
      return true;
    }
    return false;
  }, []);

  const isBagsPack = useCallback((item: ProductPack | CartItem | GuestCartCheckItem) => {
    const productPack = convertToProductPack(item);
    if (
      productPack?.id === packIds.bagsXS ||
      productPack?.id === packIds.bagsS ||
      productPack?.id === packIds.bagsM ||
      productPack?.id === packIds.bagsL ||
      productPack?.id === packIds.bagsXL ||
      productPack?.id === packIds.bagsMIX
    ) {
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

  const getProductPackImgUrl = useCallback((item: ProductPack | CartItem | GuestCartCheckItem) => {
    const productPack = convertToProductPack(item);
    if (productPack) {
      if (isEverfreshPack(item)) {
        return everfreshPackImgIds[0];
      } else if (isBagsPack(item)) {
        return bagsPackImgIds[0];
      }
    }
    return placeholderImgId;
  }, [isBagsPack, isEverfreshPack]);

  const getCartItemImgUrl = useCallback((item: CartItem | GuestCartCheckItem) => {
    if (item.pack) {
      return getProductPackImgUrl(item.pack);
    } else if (item.inventory) {
      return getProductImgUrl(item);
    }
    return placeholderImgId;
  }, [getProductImgUrl, getProductPackImgUrl]);
  
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

  const getProductInventories = useCallback((product?: Product) => {
    if (product) {
      return product.inventories || [];
    }
    return (everfreshProduct.inventories || []).concat(bagsProduct.inventories || []);
  }, [bagsProduct.inventories, everfreshProduct.inventories]);

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

  const getProductVariants = useCallback((product?: Product) => {
    const inventories = getProductInventories(product);
    const packs = getProductPacks(product);
    let variants: (ProductInventory | ProductPack)[] = [];
    variants = variants.concat(inventories, packs);
    return variants;
  }, [getProductInventories, getProductPacks]);

  const getBagsPack = useCallback((inventory: ProductInventory) => {
    const bagsPack = getProductPacks(bagsProduct).find((pack) => {
      const foundInventory = pack.inventories.find((item) => item.id === inventory.id);
      return foundInventory !== undefined;
    });
    return bagsPack;
  }, [bagsProduct, getProductPacks]);

  const getProductInventory = useCallback((id: number) => {
    return getProductInventories().find(item => item.id === id);
  }, [getProductInventories]);

  const getProductPack = useCallback((id: number) => {
    const packs = getProductPacks();
    return packs.find(item => item.id === id);
  }, [getProductPacks]);

  const getProductRating = useCallback((product?: Product) => {
    let total = 0;
    let reviewsCount = 0;
    const productVariants = getProductVariants(product);
    productVariants.forEach((item) => {
      total += parseFloat(item.rating);
      reviewsCount += item.reviewsCount;
    });
    const rating = total === 0 && productVariants.length === 0 ? 0 : NP.round(NP.divide(total, productVariants.length), 2);
    return {
      rating: rating,
      reviewsCount: reviewsCount,
    };
  }, [getProductVariants]);

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
        getCartItemImgUrl,
        getProductDetailImgsUrl,
        getProductInventories,
        getProductPacks,
        getProductVariants,
        getBagsPack,
        getProductInventory,
        getProductPack,
        getProductRating,
        listProductReviews,
        setListProductReviews,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
