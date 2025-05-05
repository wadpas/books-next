'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatters'
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { FormEvent, useState } from 'react'

type CheckoutFormProps = {
  product: {
    id: string
    imagePath: string
    name: string
    price: number
    description: string
  }
  clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    <Elements
      options={{ clientSecret }}
      stripe={stripePromise}>
      <Form />
    </Elements>
  )
}

function Form() {
  const stripe = useStripe()
  const elements = useElements()
  return <PaymentElement />
}
