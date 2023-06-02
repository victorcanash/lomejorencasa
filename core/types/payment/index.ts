export type PaymentConfig = {
  vatPercent: number,
  firstBuyDiscountPercent: number,
};

export type PaypalCredentials = {
  token: string,
  advancedCards?: boolean,
};
