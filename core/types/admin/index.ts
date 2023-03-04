import { ManageActions } from '@core/constants/app';
import { Product, ProductInventory, ProductDiscount } from '@core/types/products';

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
