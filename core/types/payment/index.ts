export interface PaymentConfig {
  vatPercent: number
  firstBuyDiscountPercent: number
}

export interface PaypalCredentials {
  token: string
  advancedCards?: boolean
}
