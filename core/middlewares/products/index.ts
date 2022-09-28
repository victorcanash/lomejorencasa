import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import type { Product, ProductCategory, ProductInventory, ProductDiscount } from '@core/types/products';

export const getProducts = (page: number, limit: number, sortBy: string, order: string, keywords: string, categoryName: string, ordersRemain: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let addParams: any = {
    page,
    limit,
    sortBy,
    order,
    keywords,
    ordersRemain,
  };
  if (categoryName != 'all' ) {
    addParams = {
      page,
      limit,
      sortBy,
      order,
      keywords,
      categoryName,
      ordersRemain,
    };
  }
  const options: AxiosRequestConfig = {
    params: addParams,
  }
  return axios.get('/products', options);
};

export const getProductById = (id: number) => {
  const options: AxiosRequestConfig = {
    params: {
      id,
    }
  }
  return axios.get(`/products/${id}`, options);
};

export const getProductCategories = (page: number, limit: number, sortBy?: string, order?: string) => {
  const options: AxiosRequestConfig = {
    params: {
      page,
      limit,
      sortBy,
      order,
    }
  }
  return axios.get('/pcategories', options);
};

export const getProductDiscounts = (token: string, page: number, limit: number, productId: number, sortBy?: string, order?: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      page,
      limit,
      productId,
      sortBy,
      order,
    }
  }
  return axios.get('/pdiscounts', options);
};

export const createProduct = (token: string, product: Product) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/products', product, options);
};

export const updateProduct = (token: string, product: Product) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/products/${product.id}`, product, options);
};

export const deleteProduct = (token: string, product: Product) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/products/${product.id}`, options)
}

export const uploadProductImages = (token: string, images: string[], productId: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post(`/products/${productId}/images`, { images }, options);
};

export const deleteProductImage = (token: string, id: number, productId: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/products/${productId}/images/${id}`, options);
};

export const createProductCategory = (token: string, productCategory: ProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/pcategories', productCategory, options);
};

export const updateProductCategory = (token: string, productCategory: ProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/pcategories/${productCategory.id}`, productCategory, options);
};

export const deleteProductCategory = (token: string, productCategory: ProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/pcategories/${productCategory.id}`, options)
}

export const createProductInventory = (token: string, productInventory: ProductInventory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/pinventories', productInventory, options);
};

export const updateProductInventory = (token: string, productInventory: ProductInventory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/pinventories/${productInventory.id}`, productInventory, options);
};

export const deleteProductInventory = (token: string, productInventory: ProductInventory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/pinventories/${productInventory.id}`, options)
}

export const createProductDiscount = (token: string, productDiscount: ProductDiscount) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/pdiscounts', productDiscount, options);
};

export const updateProductDiscount = (token: string, productDiscount: ProductDiscount) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/pdiscounts/${productDiscount.id}`, productDiscount, options);
};

export const deleteProductDiscount = (token: string, productDiscount: ProductDiscount) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/pdiscounts/${productDiscount.id}`, options)
};
