'use client'

import { createPaymentIntent } from '@/app/(customer)/actions/stripe'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Discount, Product } from '@/generated/prisma'
import { formatCurrency, formatDiscount } from '@/lib/formatters'
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'

export function CheckoutFormWrapper({
  product,
  discount,
  amount,
}: {
  product: Product
  discount?: Discount
  amount: number
}) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)
  return (
    <Elements
      options={{ amount, mode: 'payment', currency: 'usd' }}
      stripe={stripePromise}>
      <CheckoutForm
        amount={amount}
        product={product}
        discount={discount}
      />
    </Elements>
  )
}

function CheckoutForm({ product, discount, amount }: { product: Product; discount?: Discount; amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const discountRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [email, setEmail] = useState<string>()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (stripe == null || elements == null || email == null) return

    setIsLoading(true)
    const formSubmit = await elements.submit()
    if (formSubmit.error != null) {
      setErrorMessage(formSubmit.error.message)
      setIsLoading(false)
      return
    }

    const paymentIntent = await createPaymentIntent(product, amount, discount)
    if (paymentIntent.error != null) {
      setErrorMessage(paymentIntent.error)
      setIsLoading(false)
      return
    }

    stripe
      .confirmPayment({
        elements,
        clientSecret: paymentIntent.clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message)
        } else {
          setErrorMessage('An unknown error occurred')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && <CardDescription className='text-destructive'>{errorMessage}</CardDescription>}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className='mt-4'>
            <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
          </div>
          <div className='space-y-2 mt-4'>
            <Label htmlFor='discountCode'>Coupon</Label>
            <div className='flex gap-4 items-center'>
              <Input
                id='discountCode'
                type='text'
                name='discountCode'
                className='max-w-xs w-full'
                defaultValue='Developer'
                ref={discountRef}
              />
              <Button
                type='button'
                onClick={() => {
                  const params = new URLSearchParams(searchParams)
                  params.set('coupon', discountRef.current?.value || '')
                  router.push(`${pathname}?${params.toString()}`)
                }}>
                Apply
              </Button>
              {discount != null && <div className='text-muted-foreground'>{formatDiscount(discount)} discount</div>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className='w-full'
            size='lg'
            disabled={stripe == null || elements == null || isLoading}>
            {isLoading ? 'Purchasing...' : `Purchase - ${formatCurrency(amount)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
