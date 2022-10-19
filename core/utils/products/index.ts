import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { limitByPageSearch, orderRemainsSearch } from '@core/constants/products';
import { ManageActions } from '@core/constants/auth';
import type { Product, ProductCategory, ProductInventory, ProductDiscount } from '@core/types/products';
import { 
  getProducts, 
  getAdminProducts,
  getProductById, 
  getAdminProductById,
  getProductImgUrl as getProductImgUrlMW,
  getProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImgs as uploadProductImgsMW,
  deleteProductImg as deleteProductImgMW,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  createProductInventory,
  updateProductInventory,
  deleteProductInventory,
  createProductDiscount,
  updateProductDiscount,
  deleteProductDiscount,
} from '@core/middlewares/products';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import placeholder from 'public/images/placeholder.jpeg';

export const getAllProducts = async (page: number, sortBy: string, order: string, keywords: string, categoryName: string) => {
  return new Promise<{
    products: Product[], 
    productCategory: ProductCategory | null, 
    totalPages: number, 
    currentPage: number,
  }>(async (resolve, reject) => {
    getProducts(page, limitByPageSearch, sortBy, order, keywords, categoryName, orderRemainsSearch)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.products) {
          resolve({
            products: response.data.products,
            productCategory: response.data.category,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Products ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getAllAdminProducts = async (token: string, page: number, sortBy: string, order: string, keywords: string, categoryName: string) => {
  return new Promise<{
    products: Product[], 
    productCategory: ProductCategory | null, 
    totalPages: number, 
    currentPage: number,
  }>(async (resolve, reject) => {
    getAdminProducts(token, page, limitByPageSearch, sortBy, order, keywords, categoryName)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.products) {
          resolve({
            products: response.data.products,
            productCategory: response.data.category,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Admin Products ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getProduct = (id: number) => {
  return new Promise<{product: Product}>(async (resolve, reject) => {
    getProductById(id)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.product) {
          resolve({
            product: response.data.product
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Product By Id ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getAdminProduct = (token: string, id: number) => {
  return new Promise<{product: Product}>(async (resolve, reject) => {
    getAdminProductById(token, id)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.product) {
          resolve({
            product: response.data.product
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Admin Product By Id ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getProductImgUrl = (product: Product, index = 0) => {
  if (product.imageNames.length > index && product.imageNames[index]) {
    return getProductImgUrlMW(index, product.id);
  }
  return placeholder;
};

export const getAllProductCategories = async () => {
  return new Promise<{productCategories: ProductCategory[]}>(async (resolve, reject) => {
    getProductCategories(1, 1000)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.productCategories) {
          resolve({
            productCategories: response.data.productCategories
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Product Categories ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  })
};

export const manageProduct = (action: ManageActions, token: string, product: Product) => {
  return new Promise<{product: Product}>(async (resolve, reject) => {
    let promiseMW = createProduct;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Product ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateProduct;
      errorTitle = 'Update Product ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteProduct;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Product ERROR';
    }

    promiseMW(token, product)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            product: response.data.product,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(errorTitle, error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};

export const uploadProductImgs = (token: string, productImages: File[], productId: number) => {
  return new Promise<{productImages: string[]}>(async (resolve, reject) => {
    uploadProductImgsMW(token, productImages, productId)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          resolve({
            productImages: response.data.productImages,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Upload Product Images ERROR', error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      });
  }); 
};

export const deleteProductImg = (token: string, id: number, productId: number) => {
  return new Promise<{productImages: string[]}>(async (resolve, reject) => {
    deleteProductImgMW(token, id, productId)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK) {
          resolve({
            productImages: response.data.productImages,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Delete Product Image ERROR', error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      });
  }); 
};

export const manageProductCategory = (action: ManageActions, token: string, productCategory: ProductCategory) => {
  return new Promise<{productCategory: ProductCategory}>(async (resolve, reject) => {
    let promiseMW = createProductCategory;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Product Category ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateProductCategory;
      errorTitle = 'Update Product Category ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteProductCategory;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Product Category ERROR';
    }

    promiseMW(token, productCategory)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            productCategory: response.data.productCategory,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(errorTitle, error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};

export const manageProductInventory = (action: ManageActions, token: string, productInventory: ProductInventory) => {
  return new Promise<{productInventory: ProductInventory}>(async (resolve, reject) => {
    let promiseMW = createProductInventory;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Product Inventory ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateProductInventory;
      errorTitle = 'Update Product Inventory ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteProductInventory;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Product Inventory ERROR';
    }

    promiseMW(token, productInventory)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            productInventory: response.data.productInventory,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(errorTitle, error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};

export const manageProductDiscount = (action: ManageActions, token: string, productDiscount: ProductDiscount) => {
  return new Promise<{productDiscount: ProductDiscount}>(async (resolve, reject) => {
    let promiseMW = createProductDiscount;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Product Discount ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateProductDiscount;
      errorTitle = 'Update Product Discount ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteProductDiscount;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Product Discount ERROR';
    }

    promiseMW(token, productDiscount)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            productDiscount: response.data.productDiscount,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(errorTitle, error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};
