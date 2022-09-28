import { AxiosRequestConfig } from 'axios';

import axios from '@core/config/axios.config';
import { 
  FormCreateProduct, 
  FormUpdateProduct,
  FormCreatePCategory, 
  FormUpdatePCategory,
  FormCreatePInventory, 
  FormUpdatePInventory, 
  FormCreatePDiscount, 
  FormUpdatePDiscount, 
} from '@core/types/forms/products';

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


export const createProduct = (token: string, formCreateProduct: FormCreateProduct) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/products', formCreateProduct, options);
};

export const updateProduct = (token: string, formUpdateProduct: FormUpdateProduct, id: number) => {
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
      Authorization: `Bearer ${token}`
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

export const createPCategory = (token: string, formCreatePCategory: FormCreatePCategory) => {
  const options: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios.post('/pcategories', formCreatePCategory, options);
};

export const updatePCategory = (token: string, formUpdatePCategory: FormUpdatePCategory, id: number) => {
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

export const createPInventory = (token: string, formCreatePInventory: FormCreatePInventory, productId: number) => {
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

export const updatePInventory = (token: string, formUpdatePInventory: FormUpdatePInventory, id: number) => {
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
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(`/pinventories/${id}`, options)
}

export const createPDiscount = (token: string, formCreatePDiscount: FormCreatePDiscount, productId: number) => {
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

export const updatePDiscount = (token: string, formUpdatePDiscount: FormUpdatePDiscount, id: number) => {
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
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(`/pdiscounts/${id}`, options)
};
