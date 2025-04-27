'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProduct } from '../../_actions/products'
import { useFormStatus } from 'react-dom'

export function ProductForm() {
  return (
    <form
      action={addProduct}
      className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='price'>Price In Cents</Label>
        <Input
          type='number'
          id='price'
          name='price'
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          name='description'
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='file'>File</Label>
        <Input
          type='file'
          id='file'
          name='file'
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input
          type='file'
          id='image'
          name='image'
          required
        />
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
