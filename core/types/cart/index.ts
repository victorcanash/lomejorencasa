import type { ProductInventory } from '@core/types/products';

export type Cart = {
  id: number,
  userId: number,
  items: CartItem[],
};

export type CartItem = {
  id: number,
  cartId: number,
  inventoryId: number,
  inventory: ProductInventory,
  quantity: number,
};


export type GuestCart = {
  items: GuestCartItem[]
}

export type GuestCartItem = {
  inventoryId: number
  quantity: number
}

export type GuestCartCheck = {
  items: GuestCartCheckItem[]
}

export type GuestCartCheckItem = {
  inventory: ProductInventory
  quantity: number
}