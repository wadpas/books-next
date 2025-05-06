import { Body, Container, Head, Heading, Html, Preview, Tailwind } from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'

type PurchaseReceiptEmailProps = {
  product: {
    name: string
    imagePath: string
    description: string
    filePath: string
  }
  order: { id: string; createdAt: Date; total: number }
  downloadVerificationId: string
}

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: 'Product name',
    description: 'Some description',
    imagePath: 'https://nbtnpxas3dbkrjhb.public.blob.vercel-storage.com/agata-kristi/nebezpeka-domu-na-okolytsi.webp',
    filePath: 'https://nbtnpxas3dbkrjhb.public.blob.vercel-storage.com/agata-kristi/nebezpeka-domu-na-okolytsi.fb2',
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    total: 112,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({ product, order, downloadVerificationId }: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
