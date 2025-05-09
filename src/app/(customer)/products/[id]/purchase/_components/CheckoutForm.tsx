'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getDiscountedAmount } from '@/lib/discountHelpers'
import { formatCurrency, formatDiscount } from '@/lib/formatters'
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'

type CheckoutFormProps = {
  product: {
    id: string
    imagePath: string
    name: string
    price: number
    description: string
  }
  discount?: {
    id: string
    amount: number
    type: any
  }
  clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret, discount }: CheckoutFormProps) {
  const amount = discount == null ? product.price : getDiscountedAmount(discount, product.price)
  const isDiscounted = amount !== product.price

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <div className='flex gap-4 items-center'>
        <div className='aspect-[2/3] flex-shrink-0 relative w-96'>
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className='object-cover'
          />
        </div>
        <div>
          <div className='text-lg flex gap-4 items-baseline'>
            <div className={isDiscounted ? 'line-through text-muted-foreground text-sm' : ''}>
              {formatCurrency(product.price)}
            </div>
            {isDiscounted && <div className=''>{formatCurrency(amount)}</div>}
          </div>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>{product.description}</div>
        </div>
      </div>
      <Elements
        options={{ clientSecret }}
        stripe={stripePromise}>
        <Form
          price={product.price}
          productId={product.id}
          discount={discount}
        />
      </Elements>
    </div>
  )
}

function Form({
  price,
  productId,
  discount,
}: {
  price: number
  productId: string
  discount?: {
    id: string
    amount: number
    type: any
  }
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const discountRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const coupon = searchParams.get('coupon')
  const [errorMessage, setErrorMessage] = useState<string>()
  const [email, setEmail] = useState<string>()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (stripe == null || elements == null || email == null) return

    setIsLoading(true)

    stripe
      .confirmPayment({
        elements,
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
                defaultValue={coupon || ''}
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
            {isLoading ? 'Purchasing...' : `Purchase - ${formatCurrency(price)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
