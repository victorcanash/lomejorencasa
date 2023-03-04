import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders } from '@core/config/axios.config';
import { ManageActions } from '@core/constants/app';
import { Storages } from '@core/constants/storage';
import { GuestCartKey } from '@core/constants/cart';
import type { Cart, CartItem, GuestCart, GuestCartCheck, GuestCartCheckItem } from '@core/types/cart';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { getStorageItem, setStorageItem } from '@core/utils/storage';

export const checkCart = (token: string | undefined, cart: Cart) => {
  return new Promise<{cart: Cart, changedItemsByInventory: CartItem[]}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: token ? getAuthHeaders(token) : undefined,
    };
    const cartId = token ? cart.id : -1;
    const body = !token ? {
      guestCart: convertCartToGuestCart(cart),
    } : undefined;
    axios.put(`/carts/${cartId}/check`, body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          // User cart
          if ((response.data.cart as Cart)?.id) {
            resolve({
              cart: response.data.cart,
              changedItemsByInventory: response.data.changedItemsByInventory,
            });
          // Guest cart
          } else if ((response.data.cart as GuestCartCheck)?.items) {
            await setGuestCart(response.data.cart as GuestCartCheck);
            resolve({
              cart: convertGuestCartCheckToCart(response.data.cart as GuestCartCheck),
              changedItemsByInventory: convertGuestCartCheckItemsToCartItems(response.data.changedItemsByInventory as GuestCartCheckItem[])
            });
          } else {
            throw new Error('Something went wrong');
          }
        } else {
          throw new Error('Something went wrong');
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Check Cart ERROR', error);
        logBackendError(errorMsg)
        reject(new Error(errorMsg));
      }); 
  });
};

export const itemTotalPriceNumber = (item: CartItem | GuestCartCheckItem, setQuantity?: number) => {
  const price = 0;
  if (item.inventory) {
    return item.inventory?.realPrice * (setQuantity ? setQuantity : item.quantity);
  } else if (item.pack) {
    return item.pack?.price * (setQuantity ? setQuantity : item.quantity);
  }
  return price;
};

export const itemTotalPriceString = (item: CartItem | GuestCartCheckItem) => {
  if (item.inventory) {
    return `${(item.inventory.realPrice * item.quantity).toFixed(2)} €`;
  } else if (item.pack) {
    return `${(item.pack.price * item.quantity).toFixed(2)} €`;
  }
  return '';
};

export const availableItemQuantity = (item: CartItem | GuestCartCheckItem) => {
  if (item.inventory && item.inventory.quantity <= 0) {
    return false;
  } else if (item.pack && item.pack.quantity <= 0) {
    return false;
  } else if (!item.pack && !item.inventory) {
    return false;
  }
  return true;
};

export const setGuestCart = async (cart: Cart | GuestCartCheck) => {
  const guestCart = convertCartToGuestCart(cart);
  await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
};

export const getGuestCart = async () => {
  const guestCart = { items: [] } as GuestCart;
  const guestCartStorage = await getStorageItem(Storages.local, GuestCartKey);
  if (guestCartStorage) {
    const guestCartObj = JSON.parse(guestCartStorage) as GuestCart;
    if (guestCartObj?.items && guestCartObj.items.length > 0) {
      guestCart.items = guestCartObj.items;
    }
  }
  return guestCart;
};

export const convertCartToGuestCart = (cart: Cart | GuestCartCheck) => {
  return {
    items: cart.items.map((item) => {
      return {
        inventoryId: item.inventory?.id,
        packId: item.pack?.id,
        quantity: item.quantity,
      };
    })
  } as GuestCart;
};

export const convertGuestCartCheckToCart = (guestCartCheck: GuestCartCheck) => {
  return {
    id: -1,
    userId: -1,
    items: convertGuestCartCheckItemsToCartItems(guestCartCheck.items)
  } as Cart;
};

const convertGuestCartCheckItemsToCartItems = (items: GuestCartCheckItem[]) => {
  return items.map((item) => {
    return {
      id: -1,
      cartId: -1,
      inventoryId: item.inventory?.id,
      packId: item.pack?.id,
      inventory: item.inventory,
      pack: item.pack,
      quantity: item.quantity,
    } as CartItem;
  });
};

export const manageCartItem = (action: ManageActions, token: string, cart: Cart, cartItem: CartItem) => {
  return new Promise<{cartItem: CartItem}>(async (resolve, reject) => {
    // Guest cart
    if (!token) {
      const guestCart = convertCartToGuestCart(cart);
      if (action == ManageActions.create) {
        await createGuestCartItem(guestCart, cartItem);
      } else if (action == ManageActions.update) {
        await updateGuestCartItem(guestCart, cartItem);
      } else if (action == ManageActions.delete) {
        await deleteGuestCartItem(guestCart, cartItem);
      }
      resolve({
        cartItem,
      }); 
      return;
    }
    // User cart
    let promiseMW = createCartItem;
    let successStatus = StatusCodes.CREATED;
    let errorTitle = 'Create Cart Item ERROR';
    if (action == ManageActions.update) {
      promiseMW = updateCartItem;
      errorTitle = 'Update Cart Item ERROR';
    } else if (action == ManageActions.delete) {
      promiseMW = deleteCartItem;
      successStatus = StatusCodes.OK;
      errorTitle = 'Delete Cart Item ERROR';
    }
    promiseMW(token, cartItem)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            cartItem: response.data.cartItem,
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

const createCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.post('/cart-items', cartItem, options);
};

const updateCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.put(`/cart-items/${cartItem.id}`, cartItem, options);
};

const deleteCartItem = (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token),
  };
  return axios.delete(`/cart-items/${cartItem.id}`, options);
};

const createGuestCartItem = async (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items.push({
    inventoryId: cartItem.inventoryId,
    packId: cartItem.packId,
    quantity: cartItem.quantity,
  });
  await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
};

const updateGuestCartItem = async (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items = guestCart.items.map((item) => {
    if (item.inventoryId === cartItem.inventoryId) {
      return {
        inventoryId: cartItem.inventoryId,
        packId: cartItem.packId,
        quantity: cartItem.quantity,
      };
    }
    return item;
  })
  await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
};

const deleteGuestCartItem = async (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items.forEach((item, index) => {
    if (item.inventoryId === cartItem.inventoryId && item.packId === cartItem.packId) {
      guestCart.items.splice(index, 1);
      return;
    }
  });
  await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
};
