import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import axios, { getAuthHeaders } from '@core/config/axios.config';
import { ManageActions } from '@core/constants/auth';
import { Storages } from '@core/constants/storage';
import { GuestCartKey } from '@core/constants/cart';
import type { Cart, CartItem, GuestCart, GuestCartCheck, GuestCartCheckItem } from '@core/types/cart';
import type { ProductInventory } from '@core/types/products';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { getStorageItem, setStorageItem, removeStorageItem } from '@core/utils/storage';
import { getAllProductInventories } from '@core/utils/products';

export const checkCart = (token: string | undefined, cart: Cart) => {
  return new Promise<{cart: Cart, changedItemsByInventory: CartItem[]}>(async (resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: token ? getAuthHeaders(token) : undefined,
    };
    const cartId = token ? cart.id : -1;
    const body = !token ? {
      guestCart: {
        items: cart.items.map((item) => {
          return {
            inventoryId: item.inventoryId,
            quantity: item.quantity,
          }
        })
      } as GuestCart
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
            // Update to local storage
            const guestCart = {
              items: (response.data.cart as GuestCartCheck).items.map((item) => {
                return {
                  inventoryId: item.inventory.id,
                  quantity: item.quantity,
                }
              })
            } as GuestCart
            await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
            // Convert GuestCartCheck and GuestCartCheckItem[] to Cart and CartItem[]
            resolve({
              cart: {
                id: -1,
                userId: -1,
                items: (response.data.cart as GuestCartCheck).items.map((item) => {
                  return {
                    id: -1,
                    cartId: -1,
                    inventoryId: item.inventory.id,
                    inventory: item.inventory,
                    quantity: item.quantity,
                  } as CartItem;
                }),
              },
              changedItemsByInventory: (response.data.changedItemsByInventory as GuestCartCheckItem[]).map((changedItem) => {
                return {
                  id: -1,
                  cartId: -1,
                  inventoryId: changedItem.inventory.id,
                  inventory: changedItem.inventory,
                  quantity: changedItem.quantity,
                }
              }),
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

export const manageCartItem = (action: ManageActions, token: string, cartItem: CartItem) => {
  return new Promise<{cartItem: CartItem}>(async (resolve, reject) => {
    // Guest cart
    if (!token) {
      const guestCart = {
        items: [],
      } as GuestCart;
      const guestCartStorage = await getStorageItem(Storages.local, GuestCartKey);
      if (guestCartStorage) {
        const guestCartObj = JSON.parse(guestCartStorage) as GuestCart;
        if (guestCartObj?.items && guestCartObj.items.length > 0) {
          guestCart.items = guestCartObj.items;
        }
      }
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

export const createGuestCartItem = async (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items.push({
    inventoryId: cartItem.inventoryId,
    quantity: cartItem.quantity,
  });
  await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
};

export const updateGuestCartItem = async (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items = guestCart.items.map((item) => {
    if (item.inventoryId === cartItem.inventoryId) {
      return {
        inventoryId: cartItem.inventoryId,
        quantity: cartItem.quantity,
      };
    }
    return item;
  })
  await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
};

export const deleteGuestCartItem = async (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items.forEach((item, index) => {
    if (item.inventoryId == cartItem.inventoryId) {
      guestCart.items.splice(index, 1);
      return;
    }
  });
  await setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart));
};

export const getGuestCart = async (currentLocale: string) => {
  let cart = {
    id: -1,
    userId: -1,
    items: [],
  } as Cart;

  const guestCartStorage = await getStorageItem(Storages.local, GuestCartKey);
  if (!guestCartStorage) {
    return cart;
  }
  const guestCartObj = JSON.parse(guestCartStorage) as GuestCart;
  if (!guestCartObj?.items || guestCartObj.items.length <= 0) {
    return cart;
  }

  await getAllProductInventories(
      guestCartObj.items.map((item) => { return item.inventoryId; }),
      currentLocale
    )
    .then(async (response: {productInventories: ProductInventory[]}) => {
      cart = {
        id: -1,
        userId: -1,
        items: response.productInventories.map((inventory) => {
          return {
            id: -1,
            cartId: -1,
            inventoryId: inventory.id,
            inventory: inventory,
            quantity: guestCartObj.items.find((item) => item.inventoryId === inventory.id)?.quantity,
          } as CartItem;
        }),
      };
    }).catch( async(_error: Error) => {
      await removeStorageItem(Storages.local, GuestCartKey);
    });

  return cart;
};
