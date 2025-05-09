import Stripe from 'stripe'
import db from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CheckoutForm } from './_components/CheckoutForm'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

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

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: 'USD',
    metadata: { productId: product.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error('Stripe failed to create payment intent')
  }

  function getDiscount(coupon: string, productId: string) {
    return db.discount.findUnique({
      select: { id: true, amount: true, type: true },
      where: { ...usableDiscountWhere(productId), code: coupon },
    })
  }

  function usableDiscountWhere(productId: string) {
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

  return (
    <CheckoutForm
      product={product}
      discount={discount || undefined}
      clientSecret={paymentIntent.client_secret}
    />
  )
}
