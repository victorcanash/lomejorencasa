import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import envConfig from '@core/config/env.config';
import { ManageActions } from '@core/constants/auth';
import type { Product, ProductCategory, ProductInventory, ProductDiscount, ProductPack } from '@core/types/products';
import type { CartItem, GuestCartCheckItem } from '@core/types/cart';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

export const getAllProducts = async (
  token: string, 
  currentLocale: string, 
  page: number,
  limit: number,
  sortBy: string, 
  order: string, 
  keywords: string, 
  categoryName: string,
  ordersRemain: boolean, 
  adminData = false
) => {
  return new Promise<{
    products: Product[], 
    productCategory: ProductCategory | null, 
    totalPages: number, 
    currentPage: number,
  }>(async (resolve, reject) => {
    const categoryNameValue = categoryName == 'all' ? undefined : categoryName;
    const options: AxiosRequestConfig = {
      params: {
        page,
        limit,
        sortBy,
        order,
        keywords,
        categoryName: categoryNameValue,
        ordersRemain,
        adminData,
      },
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
    };
    axios.get('/products', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.products) {
          resolve({
            products: response.data.products,
            productCategory: response.data.category,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get All Products ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getAllPacks = async (
  token: string, 
  currentLocale: string, 
  page: number,
  limit: number,
  sortBy: string, 
  order: string, 
) => {
  return new Promise<{
    packs: ProductPack[], 
    totalPages: number, 
    currentPage: number,
  }>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        page,
        limit,
        sortBy,
        order,
      },
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
    };
    axios.get('/product-packs', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.productPacks) {
          resolve({
            packs: response.data.productPacks,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get All Product Packs ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getProduct = (token: string, currentLocale: string, id: number, adminData = false, bigbuyData = false) => {
  return new Promise<{product: Product}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        adminData,
        bigbuyData,
      },
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
      },
    };
    axios.get(`/products/${id}`, options)
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

export const convertToProduct = (item: Product | ProductPack | CartItem | GuestCartCheckItem) => {
  if ((item as Product)?.categoryId) {
    return item as Product;
  } 
  if ((item as ProductPack)?.inventories) {
    return getProductByPack(item as ProductPack);
  } else if ((item as CartItem | GuestCartCheckItem)?.inventory) {
    return getProductByCartItem(item as (CartItem | GuestCartCheckItem));
  }
  return undefined;
};

const getProductByCartItem = (item: CartItem | GuestCartCheckItem) => {
  if (item.inventory?.product) {
    return item.inventory.product;
  }  else if (item.pack?.inventories && item.pack.inventories.length > 0 && item.pack.inventories[0].product) {
    return item.pack.inventories[0].product;
  }
  return undefined;
};

const getProductByPack = (pack: ProductPack) => {
  if (pack.inventories && pack.inventories.length > 0 && pack.inventories[0].product) {
    return pack.inventories[0].product;
  }
  return undefined;
};

export const getProductImgUrl = (product: Product, index = 0) => {
  if (product.imageNames.length > index && product.imageNames[index]) {
    return `${envConfig.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}/images/${index}`
  }
  return undefined;
};

export const getAllProductImgsUrl = (product: Product) => {
  const imgUrls: string[] = [];
  product.imageNames.forEach((_item, index) => { 
    const imgUrl = getProductImgUrl(product, index);
    if (imgUrl) {
      imgUrls.push(imgUrl); 
    }
  });
  return imgUrls;
};

export const manageProduct = (action: ManageActions, token: string, currentLocale: string, product: Product) => {
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

    promiseMW(token, currentLocale, product)
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

const createProduct = (token: string, currentLocale: string, product: Product) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.post('/products', product, options);
};

const updateProduct = (token: string, currentLocale: string, product: Product) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(`/products/${product.id}`, product, options);
};

const deleteProduct = (token: string, currentLocale: string, product: Product) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.delete(`/products/${product.id}`, options)
}

export const uploadProductImgs = (token: string, productImages: File[], productId: number) => {
  return new Promise<{productImages: string[]}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        'Content-Type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    for (let i = 0; i < productImages.length; i++) {
      data.append('images', productImages[i]);
    }
    axios.post(`/products/${productId}/images`, data, options)
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
    const options: AxiosRequestConfig = {
      headers: getAuthHeaders(token),
    };
    axios.delete(`/products/${productId}/images/${id}`, options)
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

export const manageProductCategory = (action: ManageActions, token: string, currentLocale: string, productCategory: ProductCategory) => {
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

    promiseMW(token, currentLocale, productCategory)
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

const createProductCategory = (token: string, currentLocale: string, productCategory: ProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.post('/product-categories', productCategory, options);
};

const updateProductCategory = (token: string, currentLocale: string, productCategory: ProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(`/product-categories/${productCategory.id}`, productCategory, options);
};

const deleteProductCategory = (token: string, currentLocale: string, productCategory: ProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.delete(`/product-categories/${productCategory.id}`, options)
}

export const manageProductInventory = (action: ManageActions, token: string, currentLocale: string, productInventory: ProductInventory) => {
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

    promiseMW(token, currentLocale, productInventory)
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

const createProductInventory = (token: string, currentLocale: string, productInventory: ProductInventory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.post('/product-inventories', productInventory, options);
};

const updateProductInventory = (token: string, currentLocale: string, productInventory: ProductInventory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(`/product-inventories/${productInventory.id}`, productInventory, options);
};

const deleteProductInventory = (token: string, currentLocale: string, productInventory: ProductInventory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.delete(`/product-inventories/${productInventory.id}`, options)
}

export const manageProductDiscount = (action: ManageActions, token: string, currentLocale: string, productDiscount: ProductDiscount) => {
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

    promiseMW(token, currentLocale, productDiscount)
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

const createProductDiscount = (token: string, currentLocale: string, productDiscount: ProductDiscount) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.post('/product-discounts', productDiscount, options);
};

const updateProductDiscount = (token: string, currentLocale: string, productDiscount: ProductDiscount) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(`/product-discounts/${productDiscount.id}`, productDiscount, options);
};

const deleteProductDiscount = (token: string, currentLocale: string, productDiscount: ProductDiscount) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.delete(`/product-discounts/${productDiscount.id}`, options)
};

export const manageProductPack = (action: ManageActions, token: string, currentLocale: string, productPack: ProductPack) => {
  return new Promise<{productPack: ProductPack}>(async (resolve, reject) => {
    let promiseMW = createProductPack;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Product Pack ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateProductPack;
      errorTitle = 'Update Product Pack ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteProductPack;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Product Pack ERROR';
    }

    promiseMW(token, currentLocale, productPack)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            productPack: response.data.productPack,
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

const createProductPack = (token: string, currentLocale: string, productPack: ProductPack) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.post('/product-packs', productPack, options);
};

const updateProductPack = (token: string, currentLocale: string, productPack: ProductPack) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(`/product-packs/${productPack.id}`, productPack, options);
};

const deleteProductPack = (token: string, currentLocale: string, productPack: ProductPack) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.delete(`/product-packs/${productPack.id}`, options)
};
