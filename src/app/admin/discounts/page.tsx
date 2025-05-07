import { Button } from '@/components/ui/button'
import { PageHeader } from '../_components/PageHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import db from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'
// import { ActiveToggleDropdownItem, DeleteDropdownItem } from './_components/ProductActions'

const WHERE_EXPIRED: Prisma.DiscountWhereInput = {
  OR: [{ limit: { not: null, lte: db.discount.fields.uses } }, { expiresAt: { not: null, lte: new Date() } }],
}

function getActiveDiscounts() {
  return db.discount.findMany({
    where: { NOT: WHERE_EXPIRED },
    orderBy: { createdAt: 'asc' },
  })
}

function getExpiredDiscounts() {
  return db.discount.findMany({
    where: WHERE_EXPIRED,
    orderBy: { createdAt: 'asc' },
  })
}

export default async function DiscountsPage() {
  const [expiredDiscounts, unexpiredDiscounts] = await Promise.all([getActiveDiscounts(), getExpiredDiscounts()])

  return (
    <>
      <div className='flex items-center justify-between gap-4'>
        <PageHeader>Coupons</PageHeader>
        <Button asChild>
          <Link href='/admin/discounts/new'>Add Discounts</Link>
        </Button>
      </div>
      <DiscountsTable />

      <div className='mt-8'>
        <h2 className='text-xl font-bold'>Expired Coupons</h2>
        <DiscountsTable />
      </div>
    </>
  )
}

async function DiscountsTable() {
  return null

  // return (
  //   <Table>
  //     <TableHeader>
  //       <TableRow>
  //         <TableHead className='w-0'></TableHead>
  //         <TableHead>Name</TableHead>
  //         <TableHead>Price</TableHead>
  //         <TableHead>Orders</TableHead>
  //         <TableHead className='w-0'>
  //           <span className='sr-only'>Actions</span>
  //         </TableHead>
  //       </TableRow>
  //     </TableHeader>
  //     <TableBody>
  //       {products.map((product) => (
  //         <TableRow key={product.id}>
  //           <TableCell>{product.isAvailable ? <CheckCircle2 /> : <XCircle />}</TableCell>
  //           <TableCell>{product.name}</TableCell>
  //           <TableCell>{formatCurrency(product.price)}</TableCell>
  //           <TableCell>{formatNumber(product._count.orders)}</TableCell>
  //           <TableCell>
  //             <DropdownMenu>
  //               <DropdownMenuTrigger>
  //                 <MoreVertical />
  //                 <span className='sr-only'>Actions</span>
  //               </DropdownMenuTrigger>
  //               <DropdownMenuContent>
  //                 <DropdownMenuItem asChild>
  //                   <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
  //                 </DropdownMenuItem>
  //                 {/* <ActiveToggleDropdownItem
  //                   id={product.id}
  //                   isAvailable={product.isAvailable}
  //                 />
  //                 <DeleteDropdownItem
  //                   id={product.id}
  //                   disabled={product._count.orders > 0}
  //                 /> */}
  //               </DropdownMenuContent>
  //             </DropdownMenu>
  //           </TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // )
}
