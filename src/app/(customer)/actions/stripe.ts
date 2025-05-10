'use server'

import Stripe from 'stripe'
import { Discount, Product } from '@/generated/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function createPaymentIntent(product: Product, amount: number, discount?: Discount) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'USD',
    metadata: {
      productId: product.id,
      discountId: discount?.id || null,
    },
  })

  if (paymentIntent.client_secret == null) {
    return { error: 'Unknown error' }
  }

  return { clientSecret: paymentIntent.client_secret }
}
