import { createContext, useState, useContext } from 'react';

import type { Product } from '@core/types/products';

import { everfreshProductId, bagsProductId } from '@lib/constants/products';

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
    setEverfreshProduct(products.find((item) => item.id === everfreshProductId));
    setBagsProduct(products.find((item) => item.id === bagsProductId));
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
