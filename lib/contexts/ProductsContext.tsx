import { createContext, useState, useContext } from 'react';

import type { Product, ProductPack } from '@core/types/products';

import { 
  isEverfreshProduct, 
  isBagsProduct, 
  isEverfreshPack,
  isBagsXSPack,
  isBagsSPack,
  isBagsMPack,
  isBagsLPack,
  isBagsXLPack,
  isBagsMixPack,
} from '@lib/utils/products';

type ProductsContext = {
  everfreshProduct: Product | undefined,
  bagsProduct: Product | undefined,
  everfreshPack: ProductPack | undefined,
  bagsXSPack: ProductPack | undefined,
  bagsSPack: ProductPack | undefined,
  bagsMPack: ProductPack | undefined,
  bagsLPack: ProductPack | undefined,
  bagsXLPack: ProductPack | undefined,
  bagsMixPack: ProductPack | undefined,
  initProducts: (newProducts: Product[], newPacks: ProductPack[]) => void,
};

const ProductsContext = createContext<ProductsContext>({
  everfreshProduct: undefined,
  bagsProduct: undefined,
  everfreshPack: undefined,
  bagsXSPack: undefined,
  bagsSPack: undefined,
  bagsMPack: undefined,
  bagsLPack: undefined,
  bagsXLPack: undefined,
  bagsMixPack: undefined,
  initProducts: () => {},
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
  const [everfreshPack, setEverfreshPack] = useState<ProductPack | undefined>(undefined);
  const [bagsXSPack, setBagsXSPack] = useState<ProductPack | undefined>(undefined);
  const [bagsSPack, setBagsSPack] = useState<ProductPack | undefined>(undefined);
  const [bagsMPack, setBagsMPack] = useState<ProductPack | undefined>(undefined);
  const [bagsLPack, setBagsLPack] = useState<ProductPack | undefined>(undefined);
  const [bagsXLPack, setBagsXLPack] = useState<ProductPack | undefined>(undefined);
  const [bagsMixPack, setBagsMixPack] = useState<ProductPack | undefined>(undefined);

  const initProducts = (products: Product[], packs: ProductPack[]) => {
    products.forEach((item) => {
      if (isEverfreshProduct(item)) {
        setEverfreshProduct(item);
      } else if (isBagsProduct(item)) {
        setBagsProduct(item);
      }
    });
    packs.forEach((item) => {
      if (isEverfreshPack(item)) {
        setEverfreshPack(item);
      } else if (isBagsXSPack(item)) {
        setBagsXSPack(item);
      } else if (isBagsSPack(item)) {
        setBagsSPack(item);
      } else if (isBagsMPack(item)) {
        setBagsMPack(item);
      } else if (isBagsLPack(item)) {
        setBagsLPack(item);
      } else if (isBagsXLPack(item)) {
        setBagsXLPack(item);
      } else if (isBagsMixPack(item)) {
        setBagsMixPack(item);
      }
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        everfreshProduct,
        bagsProduct,
        everfreshPack,
        bagsXSPack,
        bagsSPack,
        bagsMPack,
        bagsLPack,
        bagsXLPack,
        bagsMixPack,
        initProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
