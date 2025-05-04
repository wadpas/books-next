import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import { Product } from '@/generated/prisma'
import { Suspense } from 'react'
import db from '@/lib/prisma'

export default function ProductsPage() {
  return (
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
        <ProductSuspense productsFetcher={getProducts} />
      </Suspense>
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

function getProducts() {
  return db.product.findMany({
    where: { isAvailable: true },
  })
}
