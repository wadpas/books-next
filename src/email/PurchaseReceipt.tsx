import { Body, Container, Head, Heading, Html, Preview, Tailwind } from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'
import { Order, Product } from '@/generated/prisma'

export default function PurchaseReceiptEmail({ product, order }: { product: Product; order: Order }) {
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
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
