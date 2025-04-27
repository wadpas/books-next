'use server'

import { z } from 'zod'
import fs from 'fs/promises'
import db from '@/lib/prisma'
import { redirect } from 'next/navigation'

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().min(1),
  file: z.instanceof(File).refine((file) => file.size > 0),
  image: z.instanceof(File).refine((file) => file.size > 0),
})

export async function addProduct(formData: FormData) {
  const result = productSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return
  }

  const data = result.data

  await fs.mkdir('products', { recursive: true })
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

  await fs.mkdir('public/products', { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      imagePath,
      filePath,
    },
  })

  redirect('/admin/products')
}
