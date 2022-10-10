import { ManageActions } from '@core/constants/auth';
import { Product, ProductInventory, ProductDiscount } from '@core/types/products';

export type CheckProduct = {
  product: Product,
  checkInventories: boolean,
  checkDiscounts: boolean,
};

export type SelectedModel = {
  product: Product | undefined,
  inventory: ProductInventory | ManageActions.create | undefined,
  discount: ProductDiscount | ManageActions.create | undefined,
};
