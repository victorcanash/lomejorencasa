import { useState } from 'react';

import { ManageActions } from '@core/constants/auth';
import type { Product, ProductCategory, ProductInventory, ProductDiscount } from '@core/types/products';
import { UploadFile } from '@core/types/upload';
import { 
  manageProduct as manageProductMW,
  uploadProductImgs,
  deleteProductImg,
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

  const validateProductImgs = (
    product: Product, 
    uploadImgs?: UploadFile[],
    deleteImgs?: number[], 
    onSuccess?: (product: Product, uploadImgs?: UploadFile[]) => void
  ) => {
    const totalImgs = product.imageNames.length - 
      (deleteImgs ? deleteImgs.length : 0) + 
      ((uploadImgs ? uploadImgs.length : 0));
    if (totalImgs < 1) {
      setSuccessMsg('');
      setErrorMsg('The product must contain at least one image');
      return false;
    } 
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
    let productId = 0;

    try {
      productId = await (await manageProductMW(ManageActions.create, token, product)).product.id;

      await uploadProductImgs(token, uploadImgs.map((item) => { return item.file; }), productId);

      for (const inventory of inventories) {
        inventory.productId = productId;
        await manageProductInventoryMW(ManageActions.create, token, inventory);
      }

      for (const discount of discounts) {
        discount.productId = productId;
        await manageProductDiscountMW(ManageActions.create, token, discount);
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    setLoading(false);
    setSuccessMsg('Created product');
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
      productResponse = await (await manageProductMW(ManageActions.update, token, product)).product;

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
    setSuccessMsg('Updated product');
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

      await manageProductMW(ManageActions.delete, token, product);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccessMsg('Deleted product');
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
        setErrorMsg(error.message);
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
        setErrorMsg(error.message);
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
    validateProductImgs,
    createProduct,
    updateProduct,
    deleteProduct,
    manageProductCategory,
    manageProductInventory,
    manageProductDiscount,
    errorMsg,
    successMsg,
  };
};

export default useProducts;
