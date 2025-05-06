import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'
import React from 'react'

type OrderHistoryEmailProps = {
  orders: {
    id: string
    total: number
    createdAt: Date
    downloadVerificationId: string
    product: {
      name: string
      imagePath: string
      filePath: string
      description: string
    }
  }[]
}

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      total: 100,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Product name',
        description: 'Some description',
        imagePath: '/products/5aba7442-e4a5-4d2e-bfa7-5bd358cdad64-02 - What Is Next.js.jpg',
        filePath: '/https://nbtnpxas3dbkrjhb.public.blob.vercel-storage.com/bleyk-krauch/temna-materiya.epub',
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      total: 200,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Product name 2',
        description: 'Some other desc',
        imagePath: '/products/db3035a5-e762-41b0-996f-d54ec730bc9c-01 - Course Introduction.jpg',
        filePath: '/https://nbtnpxas3dbkrjhb.public.blob.vercel-storage.com/bleyk-krauch/temna-materiya.epub',
      },
    },
  ],
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
