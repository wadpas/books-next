import { formatCurrency } from '@/lib/formatters'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

type ProductCardProps = {
  id: string
  name: string
  price: number
  description: string
  imagePath: string
}

export function ProductCard({ id, name, price, description, imagePath }: ProductCardProps) {
  return (
    <Card className='flex flex-col gap-4 pt-0 pb-4 overflow-hidden'>
      <div className='relative w-full h-auto aspect-video'>
        <Image
          src={imagePath}
          width={510}
          height={0}
          alt={name}
        />
      </div>
      <CardHeader className='px-4'>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(price)}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow px-4'>
        <p className='line-clamp-4'>{description}</p>
      </CardContent>
      <CardFooter className='px-4'>
        <Button
          asChild
          size='lg'
          className='w-full'>
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className='flex flex-col gap-4 pt-0 pb-4 overflow-hidden animate-pulse'>
      <div className='w-full bg-gray-300 h-[369px]' />
      <CardHeader>
        <CardTitle>
          <div className='w-3/4 h-6 bg-gray-300 rounded-full' />
        </CardTitle>
        <CardDescription>
          <div className='w-1/2 h-4 bg-gray-300 rounded-full' />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='w-full h-4 bg-gray-300 rounded-full' />
        <div className='w-full h-4 bg-gray-300 rounded-full' />
        <div className='w-3/4 h-4 bg-gray-300 rounded-full' />
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          disabled
          size='lg'></Button>
      </CardFooter>
    </Card>
  )
}
