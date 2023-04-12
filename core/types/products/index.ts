import { LocalizedText } from '@core/types/texts';

export type ProductCategory = {
  id: number,
  name: LocalizedText,
  description: LocalizedText,
};

export type Product = {
  id: number,
  categoryId: number,
  name: LocalizedText,
  description: LocalizedText,
  lowestPrice: number,
  lowestRealPrice: number,
  imageNames: string[],
  inventories?: ProductInventory[],
  discounts?: ProductDiscount[],
  activeDiscount?: ProductDiscount,
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
  rating: string,
  reviewsCount: number,
};

export type ProductPack = {
  id: number,
  name: LocalizedText,
  description: LocalizedText,
  price: number,
  quantity: number,
  originalPrice: number,
  discountPercent: number,
  inventories: ProductInventory[],
  inventoriesIds: number[],
  rating: string,
  reviewsCount: number,
};

export type ProductDiscount = {
  id: number,
  productId: number,
  name: LocalizedText,
  description: LocalizedText,
  discountPercent: number,
  active: boolean,
};

export type ProductReview = {
  id: number,
  createdAt: Date,
  userId?: number,
  guestUserId?: number,
  inventoryId?: number,
  packId?: number,
  rating: number,
  title: string,
  description: string,
  email: string,
  publicName: string,
  imageUrl?: string,
};

export type CreateProductReview = {
  // ID of variant products array in products context
  relatedProduct: string,
  rating: number,
  title: string,
  description: string,
  email: string,
  publicName: string,
};

export type ListProductReviews = {
  reviews: ProductReview[],
  totalPages: number,
  currentPage: number,
};
