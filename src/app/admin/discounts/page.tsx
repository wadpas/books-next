import { Button } from '@/components/ui/button'
import { PageHeader } from '../_components/PageHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, Minus, MoreVertical, XCircle, Infinity, Globe, Plus } from 'lucide-react'
import { formatCurrency, formatDateTime, formatDiscount, formatNumber } from '@/lib/formatters'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import db from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'
import { ActiveToggleDropdownItem, DeleteDropdownItem } from './_components/DiscountActions'

const WHERE_EXPIRED: Prisma.DiscountWhereInput = {
  OR: [{ limit: { not: null, lte: db.discount.fields.uses } }, { expiresAt: { not: null, lte: new Date() } }],
}

function getActiveDiscounts() {
  return db.discount.findMany({
    where: { NOT: WHERE_EXPIRED },
    orderBy: { createdAt: 'asc' },
    include: { products: true, orders: true },
  })
}

function getExpiredDiscounts() {
  return db.discount.findMany({
    where: WHERE_EXPIRED,
    orderBy: { createdAt: 'asc' },
    include: { products: true, orders: true },
  })
}

export default async function DiscountsPage() {
  const [activeDiscounts, expiredDiscounts] = await Promise.all([getActiveDiscounts(), getExpiredDiscounts()])

  return (
    <>
      <div className='flex items-center justify-between gap-4'>
        <PageHeader>Акції</PageHeader>
        <Button asChild>
          <div>
            <Plus />
            <Link href='/admin/discounts/new'>Додати</Link>
          </div>
        </Button>
      </div>
      <DiscountsTable discounts={activeDiscounts} />

      <div className='mt-8'>
        <h2 className='text-xl font-bold'>Завершені</h2>
        <DiscountsTable discounts={expiredDiscounts} />
      </div>
    </>
  )
}

function DiscountsTable({ discounts }: { discounts: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-0'>
            <span className='sr-only'>Is Active</span>
          </TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead>Remaining Uses</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Products</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discounts.map((discount) => (
          <TableRow key={discount.id}>
            <TableCell>
              {discount.isActive ? (
                <>
                  <span className='sr-only'>Active</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className='sr-only'>Inactive</span>
                  <XCircle className='stroke-destructive' />
                </>
              )}
            </TableCell>
            <TableCell>{discount.code}</TableCell>
            <TableCell>{formatDiscount(discount)}</TableCell>
            <TableCell>{discount.expiresAt == null ? <Minus /> : formatDateTime(discount.expiresAt)}</TableCell>
            <TableCell>
              {discount.limit == null ? <Infinity /> : formatNumber(discount.limit - discount.uses)}
            </TableCell>
            <TableCell>{formatNumber(discount.orders.length)}</TableCell>
            <TableCell>{discount.allProducts ? <Globe /> : discount.products.map((p) => p.name).join(', ')}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ActiveToggleDropdownItem
                    id={discount.id}
                    isActive={discount.isActive}
                  />
                  <DeleteDropdownItem
                    id={discount.id}
                    disabled={discount.orders.length > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
