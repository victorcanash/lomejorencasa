import {
  createContext,
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';

import type {
  Product,
  ProductInventory,
  ProductPack,
  ListProductReviews,
} from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import {
  convertToProduct,
  getAllProductImgsUrl as getAllProductImgsUrlMW,
} from '@core/utils/products';

import { pages } from '@lib/constants/navigation';
import { productIds, inventoryIds, packIds } from '@lib/constants/products';
import {
  everfreshLandingImgIds,
  bagsLandingImgIds,
  placeholderImgId,
  everfreshPackImgId,
  everfreshImgId,
  bagsXSImgId,
  bagsSImgId,
  bagsMImgId,
  bagsLImgId,
  bagsXLImgId,
  bagsPackXSImgId,
  bagsPackSImgId,
  bagsPackMImgId,
  bagsPackLImgId,
  bagsPackXLImgId,
} from '@lib/constants/multimedia';

type ProductsContext = {
  everfreshProduct: Product,
  bagsProduct: Product,
  initProducts: (newProducts: Product[], newPacks: ProductPack[]) => void,
  isEverfreshProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  isBagsProduct: (item: Product | ProductPack | CartItem | GuestCartCheckItem) => boolean,
  getProductPageUrl: (item: Product | CartItem | GuestCartCheckItem) => string,
  getProductImgUrl: (item: Product | ProductInventory | ProductPack | CartItem | GuestCartCheckItem) => string,
  getProductDetailImgsUrl: (item: Product | CartItem | GuestCartCheckItem) => string[],
  getProductInventories: (product?: Product) => ProductInventory[],
  getProductPacks: (product?: Product) => ProductPack[],
  getProductVariants: (product?: Product) => (ProductInventory | ProductPack)[],
  getBagsPack: (inventory: ProductInventory) => ProductPack | undefined,
  getProductInventory: (id: number) => ProductInventory | undefined,
  getProductPack: (id: number) => ProductPack | undefined,
  listProductReviews: ListProductReviews,
  setListProductReviews: Dispatch<SetStateAction<ListProductReviews>>,
  setProductRating: (product: Product, rating: string, reviewsCount: number) => void,
};

const ProductsContext = createContext<ProductsContext>({
  everfreshProduct: {} as Product,
  bagsProduct: {} as Product,
  initProducts: () => {},
  isEverfreshProduct: () => false,
  isBagsProduct: () => false,
  getProductPageUrl: () => '',
  getProductImgUrl: () => '',
  getProductDetailImgsUrl: () => [],
  getProductInventories: () => [],
  getProductPacks: () => [],
  getProductVariants: () => [],
  getBagsPack: () => undefined,
  getProductInventory: () => undefined,
  getProductPack: () => undefined,
  listProductReviews: {} as ListProductReviews,
  setListProductReviews: () => {},
  setProductRating: () => {},
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
    rating: '0',
    reviewsCount: 0,
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
    rating: '0',
    reviewsCount: 0,
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
  
  const getProductImgUrl = useCallback((item: Product | ProductInventory | ProductPack | CartItem | GuestCartCheckItem) => {
    // Get item type
    let product: Product | undefined;
    let inventory: ProductInventory | undefined;
    let pack: ProductPack | undefined;
    if ((item as Product)?.categoryId) {
      product = item as Product;
    } else if ((item as ProductInventory)?.sku) {
      inventory = item as ProductInventory;
    } else if ((item as ProductPack)?.inventories) {
      pack = item as ProductPack;
    } else if ((item as CartItem | GuestCartCheckItem)?.inventory) {
      inventory = (item as CartItem | GuestCartCheckItem)?.inventory;
    } else if ((item as CartItem | GuestCartCheckItem)?.pack) {
      pack = (item as CartItem | GuestCartCheckItem)?.pack;
    }
    // Get image
    if (product) {
      switch (product.id) {
        case productIds.everfresh:
          return everfreshLandingImgIds[0];
        case productIds.bags:
          return bagsLandingImgIds[0];
      }
    } else if (inventory) {
      switch (inventory.id) {
        case inventoryIds.everfresh:
          return everfreshImgId;
        case inventoryIds.bagsXS:
          return bagsXSImgId;
        case inventoryIds.bagsS:
          return bagsSImgId;
        case inventoryIds.bagsM:
          return bagsMImgId;
        case inventoryIds.bagsL:
          return bagsLImgId;
        case inventoryIds.bagsXL:
          return bagsXLImgId;
      }
    } else if (pack) {
      switch (pack.id) {
        case packIds.everfresh:
          return everfreshPackImgId;
        case packIds.bagsXS:
          return bagsPackXSImgId;
        case packIds.bagsS:
          return bagsPackSImgId;
        case packIds.bagsM:
          return bagsPackMImgId;
        case packIds.bagsL:
          return bagsPackLImgId;
        case packIds.bagsXL:
          return bagsPackXLImgId;
      }
    }
    return placeholderImgId;
  }, []);
  
  const getProductDetailImgsUrl = useCallback((item: Product | CartItem | GuestCartCheckItem) => {
    const product = convertToProduct(item);
    if (product) {
      if (isEverfreshProduct(product)) {
        return everfreshLandingImgIds;
      } else if (isBagsProduct(product)) {
        return bagsLandingImgIds;
      }
      const imgsUrl = getAllProductImgsUrlMW(product);
      return imgsUrl.length >= 1 ? imgsUrl : [placeholderImgId]
    }
    return [placeholderImgId];
  }, [isBagsProduct, isEverfreshProduct]);

  const getProductInventories = useCallback((product?: Product) => {
    let inventories = [] as ProductInventory[];
    if (product) {
      inventories = product.inventories || [] as ProductInventory[];
    } else {
      inventories = (everfreshProduct.inventories || [] as ProductInventory[])
        .concat(bagsProduct.inventories || [] as ProductInventory[]);
    }
    return inventories;
  }, [bagsProduct.inventories, everfreshProduct.inventories]);

  const getProductPacks = useCallback((product?: Product) => {
    let packs = [] as ProductPack[];
    if (product) {
      if (isEverfreshProduct(product)) {
        packs = everfreshPacks;
      } else if (isBagsProduct(product)) {
        packs = bagsPacks;
      }
    } else {
      packs = everfreshPacks.concat(bagsPacks);
    }
    return packs;
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

  const setProductRating = useCallback((product: Product, rating: string, reviewsCount: number) => {
    if (isEverfreshProduct(product)) {
      setEverfreshProduct({
        ...everfreshProduct,
        rating: rating,
        reviewsCount: reviewsCount,
      });
    } else if (isBagsProduct(product)) {
      setBagsProduct({
        ...bagsProduct,
        rating: rating,
        reviewsCount: reviewsCount,
      });
    }
  }, [bagsProduct, everfreshProduct, isBagsProduct, isEverfreshProduct]);

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
        getProductInventories,
        getProductPacks,
        getProductVariants,
        getBagsPack,
        getProductInventory,
        getProductPack,
        listProductReviews,
        setListProductReviews,
        setProductRating,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
