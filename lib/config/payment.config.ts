import type { PaymentConfig } from '@core/types/payment'

const paymentConfig: PaymentConfig = {
  vatPercent: 21,
  firstBuyDiscountPercent: 10
}

export default paymentConfig
export const vatPercent = paymentConfig.vatPercent
export const firstBuyDiscountPercent = paymentConfig.firstBuyDiscountPercent

export const vatExtractPercent = 1 + vatPercent / 100
