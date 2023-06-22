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

  const createLanding = async (
    landing: Landing,
    product?: Product,
    productPack?: ProductPack,
    onSuccess?: (landing: Landing) => void
  ) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    let newLanding: Landing | undefined = undefined;
    let newProduct: Product | undefined = undefined;
    let newProductPack: ProductPack | undefined = undefined;

    try {
      newLanding = await (await manageLandingMW(ManageActions.create, token, intl.locale, landing)).landing;

      if (product) {
        product.landingId = newLanding.id;
        newProduct = await (await manageProductMW(ManageActions.create, token, intl.locale, product)).product;
        if (product.inventories && product.inventories.length > 0) {
          newProduct.inventories = [];
          for (const inventory of product.inventories) {
            inventory.productId = newProduct.id;
            newProduct.inventories.push(await (await manageProductInventoryMW(ManageActions.create, token, intl.locale, inventory)).productInventory);
          }
        }
        if (product.discounts && product.discounts.length > 0) {
          newProduct.discounts = [];
          for (const discount of product.discounts) {
            discount.productId = newProduct.id;
            newProduct.discounts.push(await (await manageProductDiscountMW(ManageActions.create, token, intl.locale, discount)).productDiscount);
          }
        }
        newLanding.products = [newProduct];
      } else if (productPack) {
        productPack.landingId = newLanding.id;
        newProductPack = await (await manageProductPackMW(ManageActions.create, token, intl.locale, productPack)).productPack;
        newLanding.packs = [newProductPack];
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (newLanding) {
        await manageLandingMW(ManageActions.delete, token, intl.locale, landing);
      }
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }
    onCreateLandingSuccess(newLanding, onSuccess);
  };

  const onCreateLandingSuccess = (
    landing: Landing,
    onSuccess?: (landing: Landing) => void
  ) => {
    onManageLanding(ManageActions.create, landing);
    if (onSuccess) {
      onSuccess(landing);
    }
    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.createLanding' }));
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
    createLanding,
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
