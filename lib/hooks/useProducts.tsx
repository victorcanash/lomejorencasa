import { useState } from 'react';

import { useIntl } from 'react-intl';

import { ManageActions } from '@core/constants/app';
import type { 
  Product,
  ProductCategory,
  ProductInventory,
  ProductDiscount,
  ProductPack,
} from '@core/types/products';
import {
  manageProduct as manageProductMW,
  manageProductCategory as manageProductCategoryMW,
  manageProductInventory as manageProductInventoryMW,
  manageProductDiscount as manageProductDiscountMW,
  manageProductPack as manageProductPackMW,
} from '@core/utils/products';

import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useSearchContext } from '@lib/contexts/SearchContext';

const useProducts = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();
  const { productCategories, setProductCategories } = useSearchContext();

  const intl = useIntl();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  /* Admin */

  const createProduct = async (
    product: Product,
    inventories: ProductInventory[], 
    discounts: ProductDiscount[],
    onSuccess: () => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    let productId = -1;

    try {
      productId = await (await manageProductMW(ManageActions.create, token, intl.locale, product)).product.id;
      
      for (const inventory of inventories) {
        inventory.productId = productId;
        await manageProductInventoryMW(ManageActions.create, token, intl.locale, inventory);
      }

      for (const discount of discounts) {
        discount.productId = productId;
        await manageProductDiscountMW(ManageActions.create, token, intl.locale, discount);
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (productId > -1) {
        product = { ...product, id: productId }
        await manageProductMW(ManageActions.delete, token, intl.locale, product);
      }
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.createProduct' }));
    onSuccess();
  };

  const updateProduct = async (
    product: Product,
    onSuccess?: (product: Product) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    let productResponse;

    try {
      productResponse = await (await manageProductMW(ManageActions.update, token, intl.locale, product)).product;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updateProduct' }));
    if (onSuccess) {
      onSuccess(product);
    }
};

const deleteProduct = async (
  product: Product, 
  onSuccess?: (product: Product) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await manageProductMW(ManageActions.delete, token, intl.locale, product);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.deleteProduct' }));
    if (onSuccess) {
      onSuccess(product);
    }
  };

  const manageProductCategory = async (action: ManageActions, productCategory: ProductCategory, onSuccess?: (productCategory: ProductCategory) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductCategoryMW(action, token, intl.locale, productCategory)
      .then((response: {productCategory: ProductCategory}) => {
        let responseProductCategory = response.productCategory;
        if (!responseProductCategory) {
          responseProductCategory = productCategory;
        }
        onManagePCategorySuccess(action, responseProductCategory, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
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
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePCategory' }));
  };

  const manageProductInventory = async (action: ManageActions, productInventory: ProductInventory, onSuccess?: (productInventory: ProductInventory) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductInventoryMW(action, token, intl.locale, productInventory)
      .then((response: {productInventory: ProductInventory}) => {
        onManagePInventorySuccess(response.productInventory, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePInventorySuccess = (productInventory: ProductInventory, onSuccess?: (productInventory: ProductInventory) => void) => {
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePInventory' }));
    if (onSuccess) {
      onSuccess(productInventory);
    }
  };

  const manageProductDiscount = async (action: ManageActions, productDiscount: ProductDiscount, onSuccess?: (productDiscount: ProductDiscount) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductDiscountMW(action, token, intl.locale, productDiscount)
      .then((response: {productDiscount: ProductDiscount}) => {
        onManagePDiscountSuccess(response.productDiscount, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePDiscountSuccess = (productDiscount: ProductDiscount, onSuccess?: (productDiscount: ProductDiscount) => void) => {
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePDiscount' }));
    if (onSuccess) {
      onSuccess(productDiscount);
    }
  };

  const manageProductPack = async (action: ManageActions, productPack: ProductPack, onSuccess?: (productPack: ProductPack) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductPackMW(action, token, intl.locale, productPack)
      .then((response: {productPack: ProductPack}) => {
        onManagePPackSuccess(response.productPack, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePPackSuccess = (productPack: ProductPack, onSuccess?: (productPack: ProductPack) => void) => {
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePPack' }));
    if (onSuccess) {
      onSuccess(productPack);
    }
  };

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    manageProductCategory,
    manageProductInventory,
    manageProductDiscount,
    manageProductPack,
    errorMsg,
    successMsg,
  };
};

export default useProducts;
