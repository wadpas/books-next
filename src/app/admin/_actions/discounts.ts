'use server'

import db from '@/lib/prisma'
import { DiscountType } from '@/generated/prisma'
import { notFound, redirect } from 'next/navigation'
import { z } from 'zod'

const addSchema = z.object({
  code: z.string().min(1),
  amount: z.coerce.number().int().min(1),
  type: z.nativeEnum(DiscountType),
  allProducts: z.coerce.boolean(),
  productIds: z.array(z.string()).optional(),
  expiresAt: z.preprocess((value) => (value === '' ? undefined : value), z.coerce.date().min(new Date()).optional()),
  limit: z.preprocess((value) => (value === '' ? undefined : value), z.coerce.number().int().min(1).optional()),
})

export async function addDiscount(prevState: unknown, formData: FormData) {
  const productIds = formData.getAll('productIds')
  const result = addSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productIds: productIds.length > 0 ? productIds : undefined,
  })

  if (result.success === false) return result.error.formErrors.fieldErrors

  const data = result.data

  await db.discount.create({
    data: {
      code: data.code,
      amount: data.amount,
      type: data.type,
      allProducts: data.allProducts,
      products: data.productIds != null ? { connect: data.productIds.map((id) => ({ id })) } : undefined,
      expiresAt: data.expiresAt,
      limit: data.limit,
    },
  })

  redirect('/admin/discounts')
}

export async function toggleDiscountActive(id: string, isActive: boolean) {
  await db.discount.update({ where: { id }, data: { isActive } })
}

export async function deleteDiscount(id: string) {
  const discount = await db.discount.delete({ where: { id } })

  if (discount == null) return notFound()

  return discount
}
