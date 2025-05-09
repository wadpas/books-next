import db from '@/lib/prisma'

export function getValidDiscount(coupon: string, productId: string) {
  return db.discount.findUnique({
    where: {
      isActive: true,
      AND: [
        {
          OR: [{ allProducts: true }, { products: { some: { id: productId } } }],
        },
        { OR: [{ limit: null }, { limit: { gt: db.discount.fields.uses } }] },
        { OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] },
      ],
      code: coupon,
    },
  })
}
