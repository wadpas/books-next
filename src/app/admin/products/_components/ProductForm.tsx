'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProduct, updateProduct } from '../../_actions/products'
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { Product } from '@/generated/prisma'
import Image from 'next/image'

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id), {})

  return (
    <form
      action={action}
      className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          defaultValue={product?.name || ''}
          required
        />
        {error.name && <div className='text-sm text-destructive'>{error.name}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='price'>Price</Label>
        <Input
          type='number'
          id='price'
          name='price'
          defaultValue={product?.price || ''}
          required
        />
        {error.price && <div className='text-sm text-destructive'>{error.price}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          name='description'
          defaultValue={product?.description || ''}
          required
        />
        {error.description && <div className='text-sm text-destructive'>{error.description}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input
          type='text'
          id='image'
          name='image'
          required={product == null}
        />
        {product != null && (
          <Image
            src={product.imagePath}
            height='200'
            width='200'
            alt='Product Image'
          />
        )}
        {error.image && <div className='text-sm text-destructive'>{error.image}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='file'>File</Label>
        <Input
          type='file'
          id='file'
          name='file'
          required={product == null}
        />
        {product != null && <div className='text-muted-foreground'>{product.filePath}</div>}
        {error.file && <div className='text-sm text-destructive'>{error.file}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='hover:cursor-pointer'>
      {pending ? 'Saving...' : 'Submit'}
    </Button>
  )
}
