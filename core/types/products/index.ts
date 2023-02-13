import { LocalizedText } from '@core/types/texts';

export type Product = {
  id: number,
  categoryId: number,
  name: LocalizedText,
  description: LocalizedText,
  lowestPrice: number,
  lowestRealPrice: number,
  imageNames: string[],
  inventories: ProductInventory[],
  discounts?: ProductDiscount[],
  activeDiscount?: ProductDiscount,
};

export type ProductCategory = {
  id: number,
  name: LocalizedText,
  description: LocalizedText,
};

export type ProductInventory = {
  id: number,
  productId: number,
  sku: string,
  name: LocalizedText,
  description: LocalizedText,
  price: number,
  quantity: number,
  realPrice: number,
  bigbuy: {
    id: string,
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
  name: LocalizedText,
  description: LocalizedText,
  discountPercent: number,
  active: boolean,
};
