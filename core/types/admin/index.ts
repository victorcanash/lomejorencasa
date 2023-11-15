import { type ManageActions } from '@core/constants/app'
import {
  type Product,
  type ProductInventory,
  type ProductDiscount,
  type ProductCategory,
  type ProductCategoryGroup,
  type Landing
} from '@core/types/products'

export interface CheckCategoryGroup {
  categoryGroup: ProductCategoryGroup
  checkCategories: CheckCategory[]
}

export interface CheckCategory {
  category: ProductCategory
  landings: Landing[]
}

export interface CheckProduct {
  product: Product
  checkInventories: boolean
  checkDiscounts: boolean
}

export interface SelectedCheckProduct {
  product: Product | undefined
  inventory: ProductInventory | ManageActions.create | undefined
  discount: ProductDiscount | ManageActions.create | undefined
}
