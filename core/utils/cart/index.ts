import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import NP from 'number-precision'

import axios, { getAuthHeaders } from '@core/config/axios.config';
import { ManageActions } from '@core/constants/app';
import { Storages } from '@core/constants/storage';
import { GuestCartKey } from '@core/constants/cart';
import { firstBuyDiscountPercent, vatExtractPercent, vatPercent } from '@lib/config/payment.config';
import type { 
  Cart, 
  CartItem, 
  GuestCart, 
  GuestCartCheck, 
  GuestCartCheckItem,
  TotalAmount,
  ItemAmount,
} from '@core/types/cart';
import type { User, GuestUser } from '@core/types/user';
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors';
import { getStorageItem, setStorageItem } from '@core/utils/storage';

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

export const getItemAmount = (item: CartItem | GuestCartCheckItem, setQuantity?: number) => {
  const itemTotal = item.inventory ? item.inventory.realPrice : item.pack?.price || 0;
  const itemTotalWithQuantity = NP.times(itemTotal, setQuantity ? setQuantity : item.quantity);
  const itemVat = -NP.round(NP.minus(NP.divide(itemTotal, vatExtractPercent), itemTotal), 2);
  const itemSubtotal = NP.round(NP.minus(itemTotal, itemVat), 2);
  return {
    itemVat,
    itemSubtotal,
    itemTotal,
    itemTotalWithQuantity,
  } as ItemAmount;
};

export const getTotalAmount = (cart: Cart | GuestCartCheck, user: User | GuestUser) => {
  const itemsAmount: ItemAmount[] = [];
  let subtotal = 0;
  let total = 0;
  let totalQuantity = 0;
  cart.items.forEach((item) => {
    if (item.quantity > 0 && (item.inventory || item.pack)) {
      const { itemVat, itemSubtotal, itemTotal, itemTotalWithQuantity } = getItemAmount(item);
      itemsAmount.push({ itemVat, itemSubtotal, itemTotal, itemTotalWithQuantity });
      subtotal = NP.round(NP.plus(subtotal, NP.times(itemSubtotal, item.quantity)), 2);
      total = NP.round(NP.plus(total, NP.times(itemTotal, item.quantity)), 2);
      totalQuantity = NP.round(NP.plus(totalQuantity, item.quantity), 2);
    }
  })
  let firstBuyDiscount = 0;
  if ((user as User)?.firstName && !(user as User).orderExists) {
    firstBuyDiscount = NP.round(NP.times(NP.divide(firstBuyDiscountPercent, 100), total), 2);
  }
  total = NP.minus(total, firstBuyDiscount);
  const totalVat = NP.round(NP.times(NP.divide(vatPercent, 100), total), 2);
  return {
    itemsAmount,
    subtotal,
    totalVat,
    totalDiscount: firstBuyDiscount,
    total,
    totalQuantity,
  } as TotalAmount;
};
