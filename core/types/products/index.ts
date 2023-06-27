import type { FormatText, LocalizedText } from '@core/types/texts';
import type { NavItem } from '@core/types/navigation';
import type { Source } from '@core/types/multimedia';

export type ProductBannerConfig = {
  items: {
    contentText: FormatText,
    source: Source,
    button: NavItem,
  }[],
};

export type Landing = {
  id: number,
  slug: string,
  name: LocalizedText,
  description: LocalizedText,
  images: string[],
  tutorialSources: string[],
  rating: string,
  reviewsCount: number,
  products: Product[],
  packs: ProductPack[],
};

export type ProductCategoryGroup = {
  id: number,
  slug: string,
  name: LocalizedText,
  description: LocalizedText,
  image?: string,
  categories?: ProductCategory[],
};

export type ProductCategory = {
  id: number,
  categoryGroupId?: number,
  slug: string,
  name: LocalizedText,
  description: LocalizedText,
  image?: string,
  categoryGroup?: ProductCategoryGroup,
  products?: Product[],
};

export type ManageProductCategory = {
  id: number,
  isCategoryGroup?: boolean,
  categoryGroupId?: number,
  slug: string,
  name: LocalizedText,
  description: LocalizedText,
  image?: string,
};

export type Product = {
  id: number,
  landingId: number,
  name: LocalizedText,
  description: LocalizedText,
  lowestPrice: number,
  lowestRealPrice: number,
  categories?: ProductCategory[],
  inventories?: ProductInventory[],
  discounts?: ProductDiscount[],
  activeDiscount?: ProductDiscount,
  landing?: Landing,
};

export type ProductPack = {
  id: number,
  landingId: number,
  name: LocalizedText,
  description: LocalizedText,
  price: number,
  quantity: number,
  image?: string,
  metaId?: string,
  originalPrice: number,
  discountPercent: number,
  inventories: ProductInventory[],
  inventoriesIds: number[],
  landing?: Landing,
};

export type ProductInventory = {
  id: number,
  productId: number,
  sku: string,
  name: LocalizedText,
  description: LocalizedText,
  price: number,
  quantity: number,
  image?: string,
  metaId?: string,
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

export type ProductReview = {
  id: number,
  createdAt: Date,
  userId?: number,
  guestUserId?: number,
  landingId: number,
  rating: number,
  title: string,
  description: string,
  email: string,
  publicName: string,
  imageUrl?: string,
  landing?: Landing,
};
