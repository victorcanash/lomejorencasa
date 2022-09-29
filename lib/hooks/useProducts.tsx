import { useState } from 'react';

import { ManageActions } from '@core/constants/auth';
import type { ProductCategory } from '@core/types/products';
import { manageProductCategory as manageProductCategoryMW } from '@core/utils/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useSearchContext } from '@lib/contexts/SearchContext';

const useProducts = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();
  const { productCategories, setProductCategories } = useSearchContext();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const manageProductCategory = async (action: ManageActions, productCategory: ProductCategory) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductCategoryMW(action, token, productCategory)
      .then((response: {productCategory: ProductCategory}) => {
        let responseProductCategory = response.productCategory;
        if (!responseProductCategory) {
          responseProductCategory = productCategory;
        }
        onManagePCategorySuccess(action, responseProductCategory);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManagePCategorySuccess = (action: ManageActions, productCategory: ProductCategory) => {
    switch (action) {
      case ManageActions.create:
        setProductCategories(current => [...current, productCategory]);
        break;
      case ManageActions.update:
        setProductCategories(
          productCategories.map((item) => {
            if (item.id === productCategory.id) {
              return productCategory;
            } else {
              return item;
            }
          })
        );
        break;
      case ManageActions.delete:
        setProductCategories(
          productCategories.filter(item => item.id !== productCategory.id)
        );
        break;
    }
    setLoading(false);
    setSuccessMsg('Updated data');
  }

  return {
    manageProductCategory,
    errorMsg,
    successMsg,
  };
};

export default useProducts;
