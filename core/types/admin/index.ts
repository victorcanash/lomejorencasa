import { ManageActions } from '@core/constants/app';
import {
  Product,
  ProductInventory,
  ProductDiscount,
  ProductCategory,
  ProductCategoryGroup,
  Landing,
} from '@core/types/products';

export type CheckCategoryGroup = {
  categoryGroup: ProductCategoryGroup
  checkCategories: CheckCategory[]
}

export type CheckCategory = {
  category: ProductCategory
  landings: Landing[]
};

export type CheckProduct = {
  product: Product,
  checkInventories: boolean,
  checkDiscounts: boolean,
};

export type SelectedCheckProduct = {
  product: Product | undefined,
  inventory: ProductInventory | ManageActions.create | undefined,
  discount: ProductDiscount | ManageActions.create | undefined,
};
