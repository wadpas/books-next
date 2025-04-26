'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function ProductForm() {
  const [priceInCents, setPriceInCents] = useState<number>()

  return (
    <form className='space-y-8'>
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
        <Label htmlFor='priceInCents'>Price In Cents</Label>
        <Input
          type='number'
          id='priceInCents'
          name='priceInCents'
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) * 100)}
        />
      </div>
    </form>
  )
}
