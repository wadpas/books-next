import db from '@/lib/prisma'
import { PageHeader } from '../../_components/PageHeader'
// import { DiscountForm } from '../_components/DiscountForm'

export default async function NewDiscountPage() {
  const products = await db.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return (
    <>
      <PageHeader>Add Discount</PageHeader>
      {/* <DiscountForm products={products} /> */}
    </>
  )
}
