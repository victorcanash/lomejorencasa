import { createContext, useState, useContext } from 'react';

import type { Product } from '@core/types/products';

import { isEverfreshProduct, isBagsProduct } from '@lib/utils/products';

type ProductsContext = {
  products: Product[],
  everfreshProduct: Product | undefined,
  bagsProduct: Product | undefined,
  initProducts: (newProducts: Product[]) => void,
};

const ProductsContext = createContext<ProductsContext>({
  products: [],
  everfreshProduct: undefined,
  bagsProduct: undefined,
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
  const [products, setProducts] = useState<Product[]>([]);
  const [everfreshProduct, setEverfreshProduct] = useState<Product | undefined>(undefined);
  const [bagsProduct, setBagsProduct] = useState<Product | undefined>(undefined);

  const initProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    let newEverfreshProduct = undefined;
    let newBagsProduct = undefined;
    newProducts.forEach((item) => {
      if (isEverfreshProduct(item)) {
        newEverfreshProduct = item;
      } else if (isBagsProduct(item)) {
        newBagsProduct = item;
      }
    })
    setEverfreshProduct(newEverfreshProduct);
    setBagsProduct(newBagsProduct);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        everfreshProduct,
        bagsProduct,
        initProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
