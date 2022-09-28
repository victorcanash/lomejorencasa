import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import { FormProduct, FormProductCategory, FormProductInventory, FormProductDiscount } from '@core/types/forms/products';

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


export const createProduct = (token: string, formCreateProduct: FormProduct) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/products', formCreateProduct, options);
};

export const updateProduct = (token: string, formUpdateProduct: FormProduct, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/products/${id}`, formUpdateProduct, options);
};

export const deleteProduct = (token: string, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/products/${id}`, options)
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

export const createPCategory = (token: string, formCreatePCategory: FormProductCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/pcategories', formCreatePCategory, options);
};

export const updatePCategory = (token: string, formUpdatePCategory: FormProductCategory, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/pcategories/${id}`, formUpdatePCategory, options);
};

export const deletePCategory = (token: string, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/pcategories/${id}`, options)
}

export const createPInventory = (token: string, formCreatePInventory: FormProductInventory, productId: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      productId
    }
  }
  return axios.post('/pinventories', formCreatePInventory, options);
};

export const updatePInventory = (token: string, formUpdatePInventory: FormProductInventory, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/pinventories/${id}`, formUpdatePInventory, options);
};

export const deletePInventory = (token: string, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/pinventories/${id}`, options)
}

export const createPDiscount = (token: string, formCreatePDiscount: FormProductDiscount, productId: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      productId
    }
  }
  return axios.post('/pdiscounts', formCreatePDiscount, options);
};

export const updatePDiscount = (token: string, formUpdatePDiscount: FormProductDiscount, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.put(`/pdiscounts/${id}`, formUpdatePDiscount, options);
};

export const deletePDiscount = (token: string, id: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.delete(`/pdiscounts/${id}`, options)
};
