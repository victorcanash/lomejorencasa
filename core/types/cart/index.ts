import type { ProductInventory, ProductPack } from '@core/types/products';

export type Cart = {
  id: number,
  userId: number,
  items: CartItem[],
};

export type CartItem = {
  id: number,
  cartId: number,
  inventoryId?: number,
  packId?: number,
  inventory?: ProductInventory,
  pack?: ProductPack,
  quantity: number,
};


export type GuestCart = {
  items: GuestCartItem[],
};

export type GuestCartItem = {
  inventoryId?: number,
  packId?: number,
  quantity: number,
};

export type GuestCartCheck = {
  items: GuestCartCheckItem[],
};

export type GuestCartCheckItem = {
  inventory?: ProductInventory,
  pack?: ProductPack,
  quantity: number,
};
