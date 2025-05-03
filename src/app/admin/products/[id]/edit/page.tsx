import { PageHeader } from '../../../_components/PageHeader'
import { ProductForm } from '../../_components/ProductForm'
import db from '@/lib/prisma'

export default async function EditProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await db.product.findUnique({
    where: { id },
  })

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  )
}
