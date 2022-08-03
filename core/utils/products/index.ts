import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import envConfig from '@core/config/env.config';
import { limitByPageSearch, orderRemainsSearch } from '@core/constants/products';
import type { Product, ProductCategory } from '@core/types/products';
import { getProductCategories, getProducts } from '@core/services/products';
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
      let errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
      console.error(`[Get Product Categories ERROR]: ${errorMsg}`);
      reject(new Error(errorMsg));
    }); 
  })
};

export const getProductCategory = (id: number, categories: ProductCategory[]) => {
  let category = {} as ProductCategory;
  if (id < 0) {
    return category;
  }
  categories.forEach((item) => {
    if (item.id == id) {
      category = item;
      return;
    }
  })
  return category;
};

export const getAllProducts = async (page: number, sortBy: string, order: string, keywords: string, categoryId: number) => {
  return new Promise<{products: Product[], totalPages: number, currentPage: number}>(async (resolve, reject) => {
    getProducts(page, limitByPageSearch, sortBy, order, keywords, categoryId, orderRemainsSearch)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.OK && response.data?.products) {
          resolve({
            products: response.data.products,
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage
          });
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        let errorMsg = error.response?.data?.message ? error.response.data.message : error.message;
        console.error(`[Get Products ERROR]: ${errorMsg}`);
        reject(new Error(errorMsg));
      }); 
  })
};

export const getProductImgUrl = (product: Product) => {
  if (product.imageNames.length > 0 && product.imageNames[0]) {
    return `${envConfig.NEXT_PUBLIC_BACKEND_URL}/products/${product.id}/images/1`;
  }
  return placeholder;
}

export const getProductPrice = (product: Product) => {
  if (product.discount) {
    let discount = (product.discount.discountPercent / 100) * product.price;
    return roundTwoDecimals(product.price - discount);
  }
  return product.price;
}
