import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Product } from '@/generated/prisma'
import db from '@/lib/prisma'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

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
      <div className='grid grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Suspense
          fallback={
            <>
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

function getPopularProducts() {
  return db.product.findMany({
    orderBy: { orders: { _count: 'desc' } },
    take: 4,
  })
}

function getNewestProducts() {
  return db.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
  })
}
