import { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import NP from 'number-precision'

import axios, { getAuthHeaders } from '@core/config/axios.config'
import { ManageActions } from '@core/constants/app'
import { Storages } from '@core/constants/storage'
import { GuestCartKey } from '@core/constants/cart'
import { firstBuyDiscountPercent, vatExtractPercent, vatPercent } from '@lib/config/payment.config'
import type {
  Cart,
  CartItem,
  GuestCart,
  GuestCartCheck,
  GuestCartCheckItem,
  TotalAmount,
  ItemAmount
} from '@core/types/cart'
import type { User, GuestUser } from '@core/types/user'
import { type ProductCategory, type ProductCategoryGroup } from '@core/types/products'
import { getBackendErrorMsg, logBackendError } from '@core/utils/errors'
import { getStorageItem, setStorageItem } from '@core/utils/storage'
import { instanceOfUser } from '@core/utils/user'

export const manageCartItem = async (action: ManageActions, token: string, cart: Cart, cartItem: CartItem) => {
  return await new Promise<{ cartItem: CartItem }>((resolve, reject) => {
    // Guest cart
    if (token === '') {
      const guestCart = convertCartToGuestCart(cart)
      if (action === ManageActions.create) {
        createGuestCartItem(guestCart, cartItem)
      } else if (action === ManageActions.update) {
        updateGuestCartItem(guestCart, cartItem)
      } else if (action === ManageActions.delete) {
        deleteGuestCartItem(guestCart, cartItem)
      }
      resolve({
        cartItem
      })
      return
    }
    // User cart
    let promiseMW = createCartItem
    let successStatus = StatusCodes.CREATED
    let errorTitle = 'Create Cart Item ERROR'
    if (action === ManageActions.update) {
      promiseMW = updateCartItem
      errorTitle = 'Update Cart Item ERROR'
    } else if (action === ManageActions.delete) {
      promiseMW = deleteCartItem
      successStatus = StatusCodes.OK
      errorTitle = 'Delete Cart Item ERROR'
    }
    promiseMW(token, cartItem)
      .then(async (response: AxiosResponse) => {
        if (response.status === successStatus) {
          resolve({
            cartItem: response.data.cartItem
          })
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg(errorTitle, error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

const createCartItem = async (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token)
  }
  return await axios.post('/cart-items', cartItem, options)
}

const updateCartItem = async (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token)
  }
  return await axios.put(`/cart-items/${cartItem.id}`, cartItem, options)
}

const deleteCartItem = async (token: string, cartItem: CartItem) => {
  const options: AxiosRequestConfig = {
    headers: getAuthHeaders(token)
  }
  return await axios.delete(`/cart-items/${cartItem.id}`, options)
}

const createGuestCartItem = (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items.push({
    inventoryId: cartItem.inventoryId,
    packId: cartItem.packId,
    quantity: cartItem.quantity
  })
  setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart))
}

const updateGuestCartItem = (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items = guestCart.items.map((item) => {
    if (item.inventoryId === cartItem.inventoryId) {
      return {
        inventoryId: cartItem.inventoryId,
        packId: cartItem.packId,
        quantity: cartItem.quantity
      }
    }
    return item
  })
  setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart))
}

const deleteGuestCartItem = (guestCart: GuestCart, cartItem: CartItem) => {
  guestCart.items.forEach((item, index) => {
    if (item.inventoryId === cartItem.inventoryId && item.packId === cartItem.packId) {
      guestCart.items.splice(index, 1)
    }
  })
  setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart))
}

export const setGuestCart = (cart: Cart | GuestCartCheck) => {
  const guestCart = convertCartToGuestCart(cart)
  setStorageItem(Storages.local, GuestCartKey, JSON.stringify(guestCart))
}

export const getGuestCart = () => {
  const guestCart: GuestCart = { items: [] }
  const guestCartStorage = getStorageItem(Storages.local, GuestCartKey)
  if (guestCartStorage != null) {
    const guestCartObj = JSON.parse(guestCartStorage) as GuestCart
    if (guestCartObj.items.length > 0) {
      guestCart.items = guestCartObj.items
    }
  }
  return guestCart
}

export const convertCartToGuestCart = (cart: Cart | GuestCartCheck) => {
  const guestCart: GuestCart = {
    items: cart.items.map((item) => {
      return {
        inventoryId: item.inventory?.id,
        packId: item.pack?.id,
        quantity: item.quantity
      }
    })
  }
  return guestCart
}

export const convertGuestCartCheckToCart = (guestCartCheck: GuestCartCheck) => {
  const cart: Cart = {
    id: -1,
    userId: -1,
    items: convertGuestCartCheckItemsToCartItems(guestCartCheck.items)
  }
  return cart
}

const convertGuestCartCheckItemsToCartItems = (items: GuestCartCheckItem[]) => {
  const cartItems: CartItem[] = items.map((item) => {
    const cartItem: CartItem = {
      id: -1,
      cartId: -1,
      inventoryId: item.inventory?.id,
      packId: item.pack?.id,
      inventory: item.inventory,
      pack: item.pack,
      quantity: item.quantity
    }
    return cartItem
  })
  return cartItems
}

export const checkCart = async (token: string | undefined, cart: Cart) => {
  return await new Promise<{ cart: Cart, changedItemsByInventory: CartItem[] }>((resolve, reject) => {
    const options: AxiosRequestConfig = {
      headers: (token != null) ? getAuthHeaders(token) : undefined
    }
    const cartId = (token != null) ? cart.id : -1
    const body = (token == null)
      ? {
          guestCart: convertCartToGuestCart(cart)
        }
      : undefined
    axios.put(`/carts/${cartId}/check`, body, options)
      .then(async (response: AxiosResponse) => {
        if (response.status === StatusCodes.CREATED) {
          // User cart
          if (response.data?.cart?.id != null) {
            resolve({
              cart: response.data.cart,
              changedItemsByInventory: response.data.changedItemsByInventory
            })
          // Guest cart
          } else if (response.data.cart.items != null) {
            setGuestCart(response.data.cart as GuestCartCheck)
            resolve({
              cart: convertGuestCartCheckToCart(response.data.cart as GuestCartCheck),
              changedItemsByInventory: convertGuestCartCheckItemsToCartItems(response.data.changedItemsByInventory as GuestCartCheckItem[])
            })
          } else {
            throw new Error('Something went wrong')
          }
        } else {
          throw new Error('Something went wrong')
        }
      }).catch((error) => {
        const errorMsg = getBackendErrorMsg('Check Cart ERROR', error)
        logBackendError(errorMsg)
        reject(new Error(errorMsg))
      })
  })
}

export const availableItemQuantity = (item: CartItem | GuestCartCheckItem) => {
  if ((item.inventory != null) && item.inventory.quantity <= 0) {
    return false
  } else if ((item.pack != null) && item.pack.quantity <= 0) {
    return false
  } else if ((item.pack == null) && (item.inventory == null)) {
    return false
  }
  return true
}

export const getItemAmount = (item: CartItem | GuestCartCheckItem, setQuantity?: number) => {
  const itemTotal = (item.inventory != null) ? item.inventory.realPrice : item.pack?.price ?? 0
  const itemTotalWithQuantity = NP.times(itemTotal, setQuantity ?? item.quantity)
  const itemVat = -NP.round(NP.minus(NP.divide(itemTotal, vatExtractPercent), itemTotal), 2)
  const itemSubtotal = NP.round(NP.minus(itemTotal, itemVat), 2)
  const itemAmount: ItemAmount = {
    itemVat,
    itemSubtotal,
    itemTotal,
    itemTotalWithQuantity
  }
  return itemAmount
}

export const getTotalAmount = (cart: Cart | GuestCartCheck, user: User | GuestUser) => {
  const itemsAmount: ItemAmount[] = []
  let subtotal = 0
  let total = 0
  let totalQuantity = 0
  cart.items.forEach((item) => {
    if (item.quantity > 0 && ((item.inventory != null) || (item.pack != null))) {
      const { itemVat, itemSubtotal, itemTotal, itemTotalWithQuantity } = getItemAmount(item)
      itemsAmount.push({ itemVat, itemSubtotal, itemTotal, itemTotalWithQuantity })
      subtotal = NP.round(NP.plus(subtotal, NP.times(itemSubtotal, item.quantity)), 2)
      total = NP.round(NP.plus(total, NP.times(itemTotal, item.quantity)), 2)
      totalQuantity = NP.round(NP.plus(totalQuantity, item.quantity), 2)
    }
  })
  let firstBuyDiscount = 0
  if (instanceOfUser(user) && !(user.orderExists ?? false)) {
    firstBuyDiscount = NP.round(NP.times(NP.divide(firstBuyDiscountPercent, 100), total), 2)
  }
  total = NP.minus(total, firstBuyDiscount)
  const totalVat = NP.round(NP.times(NP.divide(vatPercent, 100), total), 2)
  const totalAmount: TotalAmount = {
    itemsAmount,
    subtotal,
    totalVat,
    totalDiscount: firstBuyDiscount,
    total,
    totalQuantity
  }
  return totalAmount
}

export function instanceOfCartItem (cartItem: CartItem | GuestCartCheckItem | ProductCategory | ProductCategoryGroup): cartItem is CartItem {
  return ('cartId' in cartItem)
}

export function instanceOfGuestCartCheckItem (cartItem: CartItem | GuestCartCheckItem | ProductCategory | ProductCategoryGroup): cartItem is GuestCartCheckItem {
  return (!('cartId' in cartItem) && ('quantity' in cartItem))
}
