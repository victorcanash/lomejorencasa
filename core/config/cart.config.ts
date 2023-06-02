import type { CartConfig } from '@core/types/cart';

const cartConfig: CartConfig = {
  maxQuantity: 99,
  rangeChangeItemQuantity: 10,
};

export default cartConfig;

export const maxQuantity = cartConfig.maxQuantity;
export const rangeChangeItemQuantity = cartConfig.rangeChangeItemQuantity;
