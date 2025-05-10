import { Button } from '@/components/ui/button'
import db from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ payment_intent: string }> }) {
  const { payment_intent } = await searchParams
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent)
  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  })
  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === 'succeeded'

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <h1 className='text-4xl font-bold'>{isSuccess ? 'Success!' : 'Error!'}</h1>
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
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>{product.description}</div>
          <Button
            className='mt-4'
            size='lg'
            asChild>
            <a href={product.filePath}>Download</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
