import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import type { Product, ProductCategory } from '@core/types';
import { getProductCategories } from '@core/services/productsService';

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

/*export const addProductToCart = (
  cartItems: CartItem[],
  productToAdd: Product,
) => {
  if (cartItems.reduce((acc, { quantity }) => acc + quantity, 0) === maxCartQuantity) {
    return cartItems;
  }
  const isProductInCart = cartItems.find((cartItem) => cartItem.product.id === productToAdd.id);

  if (isProductInCart) {
    return cartItems.map((cartItem) => {
      return productToAdd.id === cartItem.product.id
        ? cartItem.quantity + 1
        : cartItem;
    });
  }
  
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeProductFromCart = (
  cartItems: CartItem[],
  productToRemove: Product,
) => {
  const isProductInCart = cartItems.find(({ id }) => id === productToRemove.id);

  if (Number(isProductInCart?.quantity) <= 1) {
    return cartItems.filter(({ id }) => id !== productToRemove.id);
  }

  return cartItems.map((cartItem) => {
    return cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

export const changeProductQuantity = (
  cartItems: CartItem[],
  product: Product,
  quantity: number,
) => {
  const availableQuantity = quantity > 99 ? 99 : quantity;

  return cartItems.map((cartItem) => {
    let newCartItem = cartItem;
    if (cartItem.product.id === product.id) {
      newCartItem 
    }
    return cartItem;
    return cartItem.product.id === product.id ? { ...cartItem, quantity: availableQuantity } : cartItem;
  });
};

export const calculateTotalCartItemsCost = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.product.price, 0);
};

export const calculateTotalCartItemsQuantity = (
  cartItems: CartItem[],
) => {
  return cartItems.reduce((total, { quantity }) => total + quantity, 0);
};*/
