export type Product = {
  id: number,
  categoryId: number,
  name: string,
  description: string,
  lowestPrice: number,
  lowestRealPrice: number,
  imageNames: string[],
  inventories: ProductInventory[],
  discounts?: ProductDiscount[],
  activeDiscount?: ProductDiscount,
};

export type ProductCategory = {
  id: number,
  name: string,
  description: string,
};

export type ProductInventory = {
  id: number,
  productId: number,
  sku: string,
  name: string,
  description: string,
  price: number,
  realPrice: number,
  bigbuy: {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
  },
  product: Product,
};

export type ProductDiscount = {
  id: number,
  productId: number,
  name: string,
  description: string,
  discountPercent: number,
  active: boolean,
};
