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
  CreateProductReview,
} from '@core/types/products';
import type { UploadFile } from '@core/types/multimedia';
import {
  createProductReview as createProductReviewMW,
  manageProduct as manageProductMW,
  uploadProductImgs,
  deleteProductImg,
  manageProductCategory as manageProductCategoryMW,
  manageProductInventory as manageProductInventoryMW,
  manageProductDiscount as manageProductDiscountMW,
  manageProductPack as manageProductPackMW,
} from '@core/utils/products';

import { uploadImgMaxSize } from '@lib/constants/multimedia';
import snackbarConfig from '@lib/constants/snackbar';
import { useAppContext } from '@lib/contexts/AppContext';
import { useAuthContext } from '@lib/contexts/AuthContext';
import { useSearchContext } from '@lib/contexts/SearchContext';
import { useProductsContext } from '@lib/contexts/ProductsContext';

const useProducts = () => {
  const { setLoading } = useAppContext();
  const { token, isLogged } = useAuthContext();
  const { productCategories, setProductCategories } = useSearchContext();
  const { productVariants } = useProductsContext();

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const createProductReview = async (
    productReview: CreateProductReview,
    uploadImgs: UploadFile[],
    onSuccess?: () => void,
  ) => {
    setSuccessMsg('');
    if (parseInt(productReview.relatedProduct) >= productVariants.length) {
      setErrorMsg(intl.formatMessage({ id: 'app.errors.default' }));
      return;
    }
    if (uploadImgs.length > 1) {
      uploadImgs.splice(uploadImgs.length, uploadImgs.length - 1);
    }
    setLoading(true);
    setErrorMsg('');
    const reviewImg = uploadImgs.length > 1 ? uploadImgs[0].file : undefined;
    const pVariantsIndex = parseInt(productReview.relatedProduct);
    const inventoryId = (productVariants[pVariantsIndex] as ProductInventory)?.sku ? productVariants[pVariantsIndex].id : undefined;
    const packId = (productVariants[pVariantsIndex] as ProductPack)?.inventories ? productVariants[pVariantsIndex].id : undefined;
    createProductReviewMW(
      isLogged() ? token : '',
      intl.locale,
      inventoryId,
      packId,
      productReview,
      reviewImg
    ).then(() => {
        setLoading(false);
        enqueueSnackbar(
          intl.formatMessage({ id: 'forms.productReview.success.default' }), 
          { variant: 'success', autoHideDuration: snackbarConfig.durations.long }
        );
        if (onSuccess) {
          onSuccess();
        }
      }).catch((error: Error) => {
        let errorMsg = error.message;
        if (errorMsg.includes('File size')) {
          errorMsg = intl.formatMessage({ id: 'forms.productReview.errors.fileSize' }, { maxSize: uploadImgMaxSize });
        } else if (errorMsg.includes('You have not bought the related product') || errorMsg.includes('getting guest user')) {
          errorMsg = intl.formatMessage({ id: 'forms.productReview.errors.notBought' });
        } else {
          errorMsg = intl.formatMessage({ id: 'app.errors.default' });
        }
        setErrorMsg(errorMsg);
        setLoading(false);
      });
  };

  /* Admin */

  const validateProductImgs = (
    product: Product, 
    uploadImgs?: UploadFile[],
    deleteImgs?: number[], 
    onSuccess?: (product: Product, uploadImgs?: UploadFile[]) => void
  ) => {
    /*const totalImgs = product.imageNames.length - 
      (deleteImgs ? deleteImgs.length : 0) + 
      ((uploadImgs ? uploadImgs.length : 0));
    if (totalImgs < 1) {
      setSuccessMsg('');
      setErrorMsg(intl.formatMessage({ id: 'admin.errors.validateProductImgs' }));
      return false;
    }*/
    if (onSuccess) {
      onSuccess(product, uploadImgs);
    }
    return true;
  };

  const createProduct = async (
    product: Product, 
    uploadImgs: UploadFile[],
    inventories: ProductInventory[], 
    discounts: ProductDiscount[],
    onSuccess: () => void
  ) => {
    if (!validateProductImgs(product, uploadImgs, undefined)) {
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    let productId = -1;
    let productImages: string[] = [];

    try {
      productId = await (await manageProductMW(ManageActions.create, token, intl.locale, product)).product.id;

      if (uploadImgs.length > 0) {
        productImages = await (await uploadProductImgs(token, uploadImgs.map((item) => { return item.file; }), productId)).productImages;
      }
      
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
        if (productImages.length > 0) {
          for (let i = productImages.length - 1; i >= 0; i--) {
            await deleteProductImg(token, i, productId);
          }
        }
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
    uploadImgs?: UploadFile[], 
    deleteImgs?: number[], 
    onSuccess?: (product: Product, uploadImgs?: UploadFile[]) => void
  ) => {
    if (!validateProductImgs(product, uploadImgs, deleteImgs)) {
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    let productResponse;

    try {
      productResponse = await (await manageProductMW(ManageActions.update, token, intl.locale, product)).product;

      if (deleteImgs && deleteImgs.length > 0) {
        for (let i = deleteImgs.length - 1; i >= 0; i--) {
          await deleteProductImg(token, deleteImgs[i], productResponse.id);
        }
      }
      
      if (uploadImgs && uploadImgs.length > 0) {
        await uploadProductImgs(token, uploadImgs.map((item) => { return item.file; }), productResponse.id);
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccessMsg(intl.formatMessage({ id: 'admin.successes.updateProduct' }));
    if (onSuccess) {
      onSuccess(product, uploadImgs);
    }
};

const deleteProduct = async (
  product: Product, 
  onSuccess?: (product: Product) => void) => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (product.imageNames && product.imageNames.length > 0) {
        for (let i = product.imageNames.length - 1; i >= 0; i--) {
          await deleteProductImg(token, i, product.id);
        }
      }

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
    createProductReview,
    validateProductImgs,
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
