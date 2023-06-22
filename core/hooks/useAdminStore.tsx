import { useState } from 'react';

import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

import { ManageActions } from '@core/constants/app';
import type { 
  Product,
  ProductCategory,
  ProductInventory,
  ProductDiscount,
  ProductPack,
  ManageProductCategory,
  ProductCategoryGroup,
  Landing,
} from '@core/types/products';
import {
  getProductCategory,
  manageProductCategory as manageProductCategoryMW,
  manageLanding as manageLandingMW, 
  manageProduct as manageProductMW,
  manageProductInventory as manageProductInventoryMW,
  manageProductDiscount as manageProductDiscountMW,
  manageProductPack as manageProductPackMW,
} from '@core/utils/products';

import { useAppContext } from '@core/contexts/AppContext';
import { useAuthContext } from '@core/contexts/AuthContext';
import { useAdminContext } from '@core/contexts/AdminContext';

const useAdminStore = () => {
  const { setLoading } = useAppContext();
  const { token } = useAuthContext();
  const {
    getLandingsByCategorySlug,
    onGetCategoryDetails,
    onManageProductCategory,
    onManageLanding,
    onManageProduct,
    onManageProductPack,
  } = useAdminContext();

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  /* Admin */

  const getCategoryDetails = async (slug: string) => {
    return new Promise<{
      landings: Landing[],
    }>(async (resolve, reject) => {
      setLoading(true);
      if (getLandingsByCategorySlug(slug).length > 0) {
        setLoading(false);
        resolve({
          landings: getLandingsByCategorySlug(slug),
        });
        return;
      }
      await getProductCategory(slug, undefined, true)
        .then((response) => {
          onGetCategoryDetails(response.landingsResult.landings, slug);
          setLoading(false);
          resolve({
            landings: response.landingsResult.landings,
          });
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar(
            error.message,
            { variant: 'error' }
          );
          reject(error);
        });
    });
  };

  const manageProductCategory = async (
    action: ManageActions,
    productCategory: ManageProductCategory,
    onSuccess?: (productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductCategoryMW(action, token, intl.locale, productCategory)
      .then((response) => {
        onManagePCategorySuccess(action, response.productCategory || productCategory, onSuccess);
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManagePCategorySuccess = (
    action: ManageActions,
    productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory,
    onSuccess?: (productCategory: ProductCategory | ProductCategoryGroup | ManageProductCategory) => void
  ) => {
    onManageProductCategory(action, productCategory);
    if (onSuccess) {
      onSuccess(productCategory);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePCategory' }));
  };

  const manageLanding = async (
    action: ManageActions,
    landing: Landing,
    onSuccess?: (landing: Landing) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageLandingMW(action, token, intl.locale, landing)
      .then((response) => {
        onManageLandingSuccess(
          action,
          response.landing ?
            {
              ...landing,
              ...response.landing,
            } : landing,
          onSuccess
        );
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManageLandingSuccess = (
    action: ManageActions,
    landing: Landing,
    onSuccess?: (landing: Landing) => void
  ) => {
    onManageLanding(action, landing);
    if (onSuccess) {
      onSuccess(landing);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updateLanding' }));
  };

  const manageProduct = async (
    action: ManageActions,
    landing: Landing,
    product: Product,
    onSuccess?: (product: Product) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductMW(action, token, intl.locale, product)
      .then((response) => {
        onManageProductSuccess(
          action,
          landing,
          response.product ? {
            ...product,
            ...response.product,
          } : product,
          onSuccess
        );
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManageProductSuccess = (
    action: ManageActions,
    landing: Landing,
    product: Product,
    onSuccess?: (product: Product) => void
  ) => {
    onManageProduct(action, landing, product);
    if (onSuccess) {
      onSuccess(product);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updateProduct' }));
  };

  const manageProductPack = async (
    action: ManageActions,
    landing: Landing,
    productPack: ProductPack,
    onSuccess?: (productPack: ProductPack) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    manageProductPackMW(action, token, intl.locale, productPack)
      .then((response) => {
        onManageProductPackSuccess(
          action,
          landing,
          response.productPack ? {
            ...productPack,
            ...response.productPack,
          } : productPack,
          onSuccess
        );
      }).catch((error: Error) => {
        setErrorMsg(error.message);
        setLoading(false);
      });
  };

  const onManageProductPackSuccess = (
    action: ManageActions,
    landing: Landing,
    productPack: ProductPack,
    onSuccess?: (productPack: ProductPack) => void
  ) => {
    onManageProductPack(action, landing, productPack);
    if (onSuccess) {
      onSuccess(productPack);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updatePPack' }));
  };

  /*const createProduct = async (
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
  };*/

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

  return {
    getCategoryDetails,
    manageProductCategory,
    manageLanding,
    manageProduct,
    manageProductPack,
    manageProductInventory,
    manageProductDiscount,
    errorMsg,
    successMsg,
  };
};

export default useAdminStore;
