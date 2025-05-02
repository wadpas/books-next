'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProduct } from '../../_actions/products'
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'

export function ProductForm() {
  const [error, action] = useActionState(addProduct, {})

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
          required
        />
        {error.name && <div className='text-destructive text-sm'>{error.name}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='price'>Price In Cents</Label>
        <Input
          type='number'
          id='price'
          name='price'
          required
        />
        {error.price && <div className='text-destructive text-sm'>{error.price}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          name='description'
          required
        />
        {error.description && <div className='text-destructive text-sm'>{error.description}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='file'>File</Label>
        <Input
          type='file'
          id='file'
          name='file'
          required
        />
        {error.file && <div className='text-destructive text-sm'>{error.file}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input
          type='file'
          id='image'
          name='image'
          required
        />
        {error.image && <div className='text-destructive text-sm'>{error.image}</div>}
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
