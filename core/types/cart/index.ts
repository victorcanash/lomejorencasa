import type { Product, ProductInventory } from '@core/types/products';

export type Cart = {
  id: number;
  userId: number;
  items: CartItem[];
}

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  inventoryId: number;
  product: Product;
  inventory: ProductInventory;
  quantity: number;
}
