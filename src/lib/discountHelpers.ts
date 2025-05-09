import { DiscountType } from '@/generated/prisma/client'

export function getDiscountedAmount(discount: { amount: number; type: DiscountType }, price: number) {
  switch (discount.type) {
    case 'PERCENTAGE':
      return Math.max(1, Math.ceil(price - (price * discount.amount) / 100))
    case 'FIXED':
      return Math.max(1, Math.ceil(price - discount.amount))
    default:
      throw new Error(`Invalid discount type ${discount.type satisfies never}`)
  }
}
