'use server'

import { z } from 'zod'
import db from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { del, put } from '@vercel/blob'

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().min(1),
  file: z.instanceof(File).refine((file) => file.size > 0),
  image: z.instanceof(File).refine((file) => file.size > 0),
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = productSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  const { url: filePath } = await put(`products/${data.file.name}`, Buffer.from(await data.file.arrayBuffer()), {
    access: 'public',
  })

  const { url: imagePath } = await put(`images/${data.image.name}`, Buffer.from(await data.image.arrayBuffer()), {
    access: 'public',
  })

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      filePath,
      imagePath,
    },
  })

  redirect('/admin/products')
}

const editProductSchema = productSchema.extend({
  file: z
    .instanceof(File)
    .refine((file) => file.size === 0)
    .optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0)
    .optional(),
})

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const result = editProductSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  if (data.file != null && data.file.size > 0) {
    await del(product.filePath)
    const { url: filePath } = await put(`products/${data.file.name}`, Buffer.from(await data.file.arrayBuffer()), {
      access: 'public',
    })
    product.filePath = filePath
  }
  if (data.image != null && data.image.size > 0) {
    await del(product.imagePath)
    const { url: imagePath } = await put(`images/${data.image.name}`, Buffer.from(await data.image.arrayBuffer()), {
      access: 'public',
    })
    product.imagePath = imagePath
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      filePath: product.filePath,
      imagePath: product.imagePath,
    },
  })

  redirect('/admin/products')
}

export async function toggleProductAvailability(id: string, isAvailable: boolean) {
  await db.product.update({
    where: { id },
    data: { isAvailable: !isAvailable },
  })
  console.log(isAvailable)
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })
  await del(product.filePath)
  await del(product.imagePath)

  if (product == null) return notFound()
}
