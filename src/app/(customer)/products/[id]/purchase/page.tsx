import db from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CheckoutForm } from './_components/CheckoutForm'
import { usableDiscountWhere } from '@/lib/discountServer'

export default async function PurchasePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ coupon?: string }>
}) {
  const { id } = await params
  const { coupon } = await searchParams

  const product = await db.product.findUnique({ where: { id } })
  if (product == null) return notFound()

  const discount = coupon == null ? undefined : await getDiscount(coupon, product.id)

  return (
    <CheckoutForm
      product={product}
      discount={discount || undefined}
    />
  )
}

function getDiscount(coupon: string, productId: string) {
  return db.discount.findUnique({
    select: { id: true, amount: true, type: true },
    where: { ...usableDiscountWhere(productId), code: coupon },
  })
}
