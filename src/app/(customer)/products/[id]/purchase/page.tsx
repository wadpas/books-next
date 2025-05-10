import db from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CheckoutFormWrapper } from './_components/CheckoutForm'
import { getValidDiscount } from '@/app/(customer)/actions/discounts'
import Image from 'next/image'
import { getDiscountedAmount } from '@/lib/discount'
import { formatCurrency } from '@/lib/formatters'

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

  const discount = coupon == null ? undefined : await getValidDiscount(coupon, product.id)
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
      <CheckoutFormWrapper
        product={product}
        discount={discount || undefined}
        amount={amount}
      />
    </div>
  )
}
