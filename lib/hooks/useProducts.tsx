import { useState } from 'react';

import { ManageActions } from '@core/constants/auth';
import type { Product, ProductCategory, ProductInventory, ProductDiscount } from '@core/types/products';
import { 
  manageProduct as manageProductMW,
  manageProductCategory as manageProductCategoryMW,
  manageProductInventory as manageProductInventoryMW,
  manageProductDiscount as manageProductDiscountMW,
} from '@core/utils/products';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useSearchContext } from '@lib/contexts/SearchContext';

const useProducts = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();
  const { productCategories, setProductCategories } = useSearchContext();

  const [errorMsg, setErrorMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const manageAllProduct = async (
    action: ManageActions.create | ManageActions.update, 
    product: Product, 
    inventories: ProductInventory[], 
    discounts: ProductDiscount[],
    onSuccess: () => void) => {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      let productId = 0;

      try {
        productId = await (await manageProductMW(action, token, product)).product.id;

        for (const inventory of inventories) {
          inventory.productId = productId;
          await manageProductInventoryMW(action, token, inventory);
        }

        for (const discount of discounts) {
          discount.productId = productId;
          await manageProductDiscountMW(action, token, discount);
        }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccessMsg('Updated data');
      onSuccess();
  };

  const manageProduct = async (action: ManageActions, product: Product, onSuccess?: (product: Product) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductMW(action, token, product)
      .then((response: {product: Product}) => {
        onManageProductSuccess(response.product, onSuccess);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManageProductSuccess = (product: Product, onSuccess?: (product: Product) => void) => {
    setLoading(false);
    setSuccessMsg('Updated data');
    if (onSuccess) {
      onSuccess(product);
    }
  };

  const manageProductCategory = async (action: ManageActions, productCategory: ProductCategory, onSuccess?: (productCategory: ProductCategory) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductCategoryMW(action, token, productCategory)
      .then((response: {productCategory: ProductCategory}) => {
        let responseProductCategory = response.productCategory;
        if (!responseProductCategory) {
          responseProductCategory = productCategory;
        }
        onManagePCategorySuccess(action, responseProductCategory, onSuccess);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManagePCategorySuccess = (action: ManageActions, productCategory: ProductCategory, onSuccess?: (productCategory: ProductCategory) => void) => {
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
    if (onSuccess) {
      onSuccess(productCategory);
    }
    setLoading(false);
    setSuccessMsg('Updated data');
  };

  const manageProductInventory = async (action: ManageActions, productInventory: ProductInventory, onSuccess?: (productInventory: ProductInventory) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductInventoryMW(action, token, productInventory)
      .then((response: {productInventory: ProductInventory}) => {
        onManagePInventorySuccess(response.productInventory, onSuccess);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManagePInventorySuccess = (productInventory: ProductInventory, onSuccess?: (productInventory: ProductInventory) => void) => {
    setLoading(false);
    setSuccessMsg('Updated data');
    if (onSuccess) {
      onSuccess(productInventory);
    }
  };

  const manageProductDiscount = async (action: ManageActions, productDiscount: ProductDiscount, onSuccess?: (productDiscount: ProductDiscount) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductDiscountMW(action, token, productDiscount)
      .then((response: {productDiscount: ProductDiscount}) => {
        onManagePDiscountSuccess(response.productDiscount, onSuccess);
      }).catch((error: Error) => {
        const errorMsg = error.message;
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  const onManagePDiscountSuccess = (productDiscount: ProductDiscount, onSuccess?: (productDiscount: ProductDiscount) => void) => {
    setLoading(false);
    setSuccessMsg('Updated data');
    if (onSuccess) {
      onSuccess(productDiscount);
    }
  };

  return {
    manageAllProduct,
    manageProduct,
    manageProductCategory,
    manageProductInventory,
    manageProductDiscount,
    errorMsg,
    successMsg,
  };
};

export default useProducts;
