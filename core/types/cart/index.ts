import type { ProductInventory, ProductPack } from '@core/types/products'

export interface CartConfig {
  maxQuantity: number
  rangeChangeItemQuantity: number
}

export interface Cart {
  id: number
  userId: number
  items: CartItem[]
}

export interface CartItem {
  id: number
  cartId: number
  inventoryId?: number
  packId?: number
  inventory?: ProductInventory
  pack?: ProductPack
  quantity: number
}

export interface GuestCart {
  items: GuestCartItem[]
}

export interface GuestCartItem {
  inventoryId?: number
  packId?: number
  quantity: number
}

export interface GuestCartCheck {
  items: GuestCartCheckItem[]
}

export interface GuestCartCheckItem {
  inventory?: ProductInventory
  pack?: ProductPack
  quantity: number
}

export interface TotalAmount {
  itemsAmount: ItemAmount[]
  subtotal: number
  totalVat: number
  totalDiscount: number
  total: number
  totalQuantity: number
}

export interface ItemAmount {
  itemVat: number
  itemSubtotal: number
  itemTotal: number
  itemTotalWithQuantity: number
}
