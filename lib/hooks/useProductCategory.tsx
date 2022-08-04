import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import type { ProductCategory } from '@core/types/products';
import { useAppContext } from '@lib/contexts/AppContext';

const useProductCategory = (name: string) => {
  const { categories } = useAppContext();

  const router = useRouter();

  const [productCategory, setProductCategory] = useState<ProductCategory | undefined>(undefined);

  useEffect(() => {
    setProductCategory(categories.find(item => item.name === name));
  }, [categories, name, router.asPath]);

  return productCategory;
};

export default useProductCategory;
