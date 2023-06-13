import { useMemo } from 'react';

import { getCategoryConfigByPath } from '@core/utils/products';
import { categoryConfigs } from '@lib/config/inventory.config';
import { useProductsContext } from '@core/contexts/ProductsContext';

const useCategoryPage = (path: string) => {
  const { getCategoryByPath } = useProductsContext();

  const data = useMemo(() => {
    const categoryModel = getCategoryByPath(path);
    const categoryConfig = getCategoryConfigByPath(path, categoryConfigs);
    return {
      categoryModel,
      categoryConfig,
    };
  }, [getCategoryByPath, path]);

  return {
    categoryModel: data.categoryModel,
    categoryConfig: data.categoryConfig,
  };
};

export default useCategoryPage;
