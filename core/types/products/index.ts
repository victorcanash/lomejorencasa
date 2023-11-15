import type { LocalizedText } from '@core/types/texts'

export interface Landing {
  id: number
  slug: string
  name: LocalizedText
  description: LocalizedText
  images: string[]
  tutorialSources: string[]
  rating: string
  reviewsCount: number
  products: Product[]
  packs: ProductPack[]
}

export interface ProductCategoryGroup {
  id: number
  slug: string
  name: LocalizedText
  description: LocalizedText
  image?: string
  categories?: ProductCategory[]
}

export interface ProductCategory {
  id: number
  categoryGroupId?: number
  slug: string
  name: LocalizedText
  description: LocalizedText
  image?: string
  categoryGroup?: ProductCategoryGroup
  products?: Product[]
}

export interface ManageProductCategory {
  id: number
  isCategoryGroup?: boolean
  categoryGroupId?: number
  slug: string
  name: LocalizedText
  description: LocalizedText
  image?: string
}

export interface Product {
  id: number
  landingId: number
  name: LocalizedText
  description: LocalizedText
  lowestPrice: number
  lowestRealPrice: number
  categories?: ProductCategory[]
  inventories?: ProductInventory[]
  discounts?: ProductDiscount[]
  activeDiscount?: ProductDiscount
  landing?: Landing
}

export interface ProductPack {
  id: number
  landingId: number
  name: LocalizedText
  description: LocalizedText
  price: number
  quantity: number
  image?: string
  metaId?: string
  originalPrice: number
  discountPercent: number
  inventories: ProductInventory[]
  inventoriesIds: number[]
  landing?: Landing
}

export interface ProductInventory {
  id: number
  productId: number
  sku: string
  name: LocalizedText
  description: LocalizedText
  price: number
  quantity: number
  image?: string
  metaId?: string
  realPrice: number
  bigbuy: {
    id: string
    name: string
    description: string
    price: number
    quantity: number
  }
  product: Product
}

export interface ProductDiscount {
  id: number
  productId: number
  name: LocalizedText
  description: LocalizedText
  discountPercent: number
  active: boolean
}

export interface ProductReview {
  id: number
  createdAt: Date
  userId?: number
  guestUserId?: number
  landingId: number
  rating: number
  title: string
  description: string
  email: string
  publicName: string
  imageUrl?: string
  landing?: Landing
}
