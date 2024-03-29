import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders, getLanguageHeaders } from '@core/config/axios.config';
import { ManageActions } from '@core/constants/app';
import type {
  Landing,
  Product,
  ProductCategory,
  ProductCategoryGroup,
  ProductInventory,
  ProductDiscount,
  ProductPack,
  ProductReview,
  ManageProductCategory,
} from '@core/types/products';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';

const locale = 'es';

export const getAllProductCategories = async (
  categoryGroups?: boolean,
  adminData?: boolean,
  page?: number,
  limit?: number,
  sortBy?: string, 
  order?: string
) => {
  return new Promise<{
    productCategories: (ProductCategory | ProductCategoryGroup)[],
    totalPages: number, 
    currentPage: number,
    categoriesWithoutGroup?: ProductCategory[]
  }>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        categoryGroups: categoryGroups,
        adminData: adminData,
        page: page || 1,
        limit: limit || 1000,
        sortBy: sortBy || 'id',
        order: order || 'asc',
      },
      headers: {
        ...getLanguageHeaders(locale),
      },
    };
    axios.get('/product-categories', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.productCategories) {
          resolve({
            productCategories: response.data.productCategories,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
            categoriesWithoutGroup: response.data.categoriesWithoutGroup,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get All Product Categories ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getProductCategory = async (
  slug: string,
  landings?: {
    page?: number,
    limit?: number,
    sortBy?: string, 
    order?: string
  },
  adminData?: boolean
) => {
  return new Promise<{
    productCategory: ProductCategory | ProductCategoryGroup,
    landingsResult: {
      landings: Landing[],
      totalPages: number, 
      currentPage: number,
    }
  }>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        page: landings?.page || 1,
        limit: landings?.limit || 1000,
        sortBy: landings?.sortBy || 'id',
        order: landings?.order || 'asc',
        adminData: adminData,
      },
      headers: {
        ...getLanguageHeaders(locale),
      },
    };
    axios.get(`/product-categories/${slug}`, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.productCategory) {
          resolve({
            productCategory: response.data.productCategory,
            landingsResult: {
              landings: response.data.landingsResult.landings,
              totalPages: response.data.landingsResult.totalPages,
              currentPage: response.data.landingsResult.currentPage,
            },
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Product Category ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getAllLandings = async (
  productsData?: boolean,
  onlyOffers?: boolean,
  page?: number,
  limit?: number,
  sortBy?: string,
  order?: string,
) => {
  return new Promise<{
    landings: Landing[],
    totalPages: number, 
    currentPage: number,
  }>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        productsData,
        onlyOffers,
        page: page || 1,
        limit: limit || 1000,
        sortBy: sortBy || 'id',
        order: order || 'asc',
      },
      headers: {
        ...getLanguageHeaders(locale),
      },
    };
    axios.get('/landings', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.landings) {
          resolve({
            landings: response.data.landings,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get All Landings ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

export const getLanding = async (
  slug: string,
) => {
  return new Promise<{
    landing: Landing,
  }>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getLanguageHeaders(locale),
      },
    };
    axios.get(`/landings/${slug}`, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.landing) {
          resolve({
            landing: response.data.landing,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get Landing ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

/*export const getAllProducts = async (
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
};*/

export const createProductReview = (
  token: string,
  currentLocale: string,
  productReview: ProductReview,
  reviewImg?: File,
) => {
  return new Promise<{
    review: ProductReview,
    productRating: {
      rating: string,
      reviewsCount: number,
    },
  }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: {
        ...getAuthHeaders(token),
        ...getLanguageHeaders(currentLocale),
        'Content-Type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    data.append('landingId', productReview.landingId.toString());
    data.append('rating', productReview.rating.toString());
    data.append('title', productReview.title);
    data.append('description', productReview.description);
    data.append('email', productReview.email);
    data.append('publicName', productReview.publicName);
    if (reviewImg) {
      data.append('image', reviewImg);
    }
    axios.post('product-reviews', data, options)
      .then(async (response: AxiosResponse) => {
        if (
            response.status === StatusCodes.CREATED &&
            response.data?.productReview &&
            response.data?.productRating
          ) {
          resolve({
            review: response.data.productReview,
            productRating: {
              rating: response.data.productRating.rating,
              reviewsCount: response.data.productRating.reviewsCount,
            },
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Create Product Review ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      });
  })
};

export const getAllProductReviews = async (
  currentLocale: string,
  page: number,
  limit: number,
  sortBy: string,
  order: string,
  landingId?: number
) => {
  return new Promise<{
    reviews: ProductReview[], 
    totalPages: number, 
    currentPage: number,
  }>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      params: {
        page,
        limit,
        sortBy,
        order,
        landingId,
      },
      headers: {
        ...getLanguageHeaders(currentLocale),
      },
    };
    axios.get('/product-reviews', options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.productReviews) {
          resolve({
            reviews: response.data.productReviews,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Get All Product Reviews ERROR', error);
        logBackendError(errorMsg);
        reject(new Error(errorMsg));
      }); 
  });
};

/*
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
};*/

// ADMIN

export const manageProductCategory = (action: ManageActions, token: string, currentLocale: string, productCategory: ManageProductCategory) => {
  return new Promise<{productCategory?: ProductCategory | ProductCategoryGroup}>(async (resolve, reject) => {
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

const createProductCategory = (token: string, currentLocale: string, productCategory: ManageProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.post('/product-categories', productCategory, options);
};

const updateProductCategory = (token: string, currentLocale: string, productCategory: ManageProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(`/product-categories/${productCategory.id}`, productCategory, options);
};

const deleteProductCategory = (token: string, currentLocale: string, productCategory: ManageProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
    params: {
      isCategoryGroup: productCategory.isCategoryGroup,
    },
  };
  return axios.delete(`/product-categories/${productCategory.id}`, options)
}

export const manageLanding = (action: ManageActions, token: string, currentLocale: string, landing: Landing) => {
  return new Promise<{landing: Landing}>(async (resolve, reject) => {
    let promiseMW = createLanding;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Landing ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateLanding;
      errorTitle = 'Update Landing ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteLanding;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Landing ERROR';
    }

    promiseMW(token, currentLocale, landing)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            landing: response.data.landing,
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

const createLanding = (token: string, currentLocale: string, landing: Landing) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.post('/landings', landing, options);
};

const updateLanding = (token: string, currentLocale: string, landing: Landing) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(`/landings/${landing.id}`, landing, options);
};

const deleteLanding = (token: string, currentLocale: string, landing: Landing) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.delete(`/landings/${landing.id}`, options)
}

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
  return axios.post(
    '/products',
    {
      ...product,
      categoriesIds: product.categories?.map((category) => { return category.id; }),
    },
    options
  );
};

const updateProduct = (token: string, currentLocale: string, product: Product) => {
  const options: AxiosRequestConfig = {
    headers: {
      ...getAuthHeaders(token),
      ...getLanguageHeaders(currentLocale),
    },
  };
  return axios.put(
    `/products/${product.id}`,
    {
      ...product,
      categoriesIds: product.categories?.map((category) => { return category.id; }),
    },
    options
  );
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
