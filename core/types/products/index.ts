export type Product = {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  realPrice: number;
  imageNames: string[];
  inventories: ProductInventory[];
  discount?: ProductDiscount;
};


export type ProductCategory = {
  id: number;
  name: string;
  description: string;
}


export type ProductInventory = {
  id: number;
  productId: number;
  quantity: number;
  size?: string;
}


export type ProductDiscount = {
  id: number;
  productId: number;
  name: string;
  description: string;
  discountPercent: number;
  active: boolean;
}
