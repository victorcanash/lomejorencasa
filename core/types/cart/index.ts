import type { Product } from '@core/types/products';

export type Cart = {
  id: number;
  userId: number;
  total: number;
  items: CartItem[];
}


export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  product: Product;
  quantity: number;
}
