import db from '@/lib/prisma'

export function usableDiscountWhere(productId: string) {
  return {
    isActive: true,
    AND: [
      {
        OR: [{ allProducts: true }, { products: { some: { id: productId } } }],
      },
      { OR: [{ limit: null }, { limit: { gt: db.discount.fields.uses } }] },
      { OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
    ],
  }
}
