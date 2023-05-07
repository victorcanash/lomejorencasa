import { OrderEmailTypes } from '@core/constants/admin';

export const getOrderEmailKey = (orderEmailValue: OrderEmailTypes) => {
  const indexOfS = Object.values(OrderEmailTypes).indexOf(orderEmailValue as unknown as OrderEmailTypes);
  const key = Object.keys(OrderEmailTypes)[indexOfS] as keyof typeof OrderEmailTypes;
  return key;
};

export const getOrderEmailValue = (orderEmailKey: string) => {
  const index = Object.keys(OrderEmailTypes).indexOf(orderEmailKey);
  return index >= 0 ? Object.values(OrderEmailTypes)[index] : '';
};
