import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Product } from '@/generated/prisma'
import { ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import db from '@/lib/prisma'
import Link from 'next/link'
import { cache } from '@/lib/cache'

export default function HomePage() {
  return (
    <main className='space-y-12'>
      <ProductGridSection
        title='Most Popular'
        productsFetcher={getPopularProducts}
      />
      <ProductGridSection
        title='Newest'
        productsFetcher={getNewestProducts}
      />
    </main>
  )
}

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl'>{title}</h2>
        <Button
          variant='outline'
          asChild>
          <Link href='/products'>
            <span>View All</span>
            <ArrowRight className='size-4' />
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6'>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }>
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductSuspense({ productsFetcher }: { productsFetcher: () => Promise<Product[]> }) {
  return (await productsFetcher()).map((product) => (
    <ProductCard
      key={product.id}
      {...product}
    />
  ))
}

const getPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailable: true },
      orderBy: { orders: { _count: 'desc' } },
      take: 6,
    })
  },
  ['/', 'getPopularProducts'],
  { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })
  },
  ['/', 'getNewestProducts'],
  { revalidate: 60 * 60 * 24 }
)
