import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import envConfig from '@core/config/env.config';
import { limitByPageSearch, orderRemainsSearch } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { getProductCategories, getProducts, getProductById } from '@core/middlewares/products';
import { roundTwoDecimals } from '@core/utils/numbers';
import placeholder from 'public/images/placeholder.jpeg';

export const getAllProductCategories = async () => {
  return new Promise<{productCategories: ProductCategory[]}>(async (resolve, reject) => {
    getProductCategories(1, 1000).then(async (response: AxiosResponse) => {
      if (response.status === StatusCodes.OK && response.data?.productCategories) {
        resolve({
          productCategories: response.data.productCategories
        });
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      const errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
      console.error(`[Get Product Categories ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    }); 
  })
};

export const getAllProducts = async (page: number, sortBy: string, order: string, keywords: string, categoryName: string) => {
  return new Promise<{products: Product[], productCategory: ProductCategory | null, totalPages: number, currentPage: number}>(async (resolve, reject) => {
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
        const errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
        console.error(`[Get Products ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
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
        const errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
        console.error(`[Get Product ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
};

export const getProductImgUrl = (product: Product, index = 0) => {
  if (product.imageNames.length > index && product.imageNames[index]) {
    return `${envConfig.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}/images/${index}`;
  }
  return placeholder;
};

export const getProductPrice = (product: Product) => {
  if (product.discount) {
    const discount = (product.discount.discountPercent / 100) * product.price;
    return roundTwoDecimals(product.price - discount);
  }
  return product.price;
};
