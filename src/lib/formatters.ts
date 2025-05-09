import { DiscountType } from '@/generated/prisma'

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 0,
})

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount)
}

const PERCENT_FORMATTER = new Intl.NumberFormat('en-US', { style: 'percent' })

export function formatDiscount({ amount, type }: { amount: number; type: DiscountType }) {
  switch (type) {
    case 'PERCENTAGE':
      return PERCENT_FORMATTER.format(amount / 100)
    case 'FIXED':
      return formatCurrency(amount)
    default:
      throw new Error(`Invalid discount code type ${type satisfies never}`)
  }
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date)
}
