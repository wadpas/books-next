import { Navbar, NavLink } from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar>
        <div className='w-[1600px] flex mx-auto text-primary-foreground bg-primary'>
          <div className='p-4'>
            <Link href='/'>
              <Image
                src='/logo.svg'
                width={200}
                height={0}
                priority
                alt='Picture of the author'
                className='object-cover w-auto h-full max-w-none'
              />
            </Link>
          </div>
          <NavLink href='/admin'>Dashboard</NavLink>
          <NavLink href='/admin/products'>Книги</NavLink>
          <NavLink href='/admin/users'>Customers</NavLink>
          <NavLink href='/admin/orders'>Sales</NavLink>
          <NavLink href='/admin/discounts'>Coupons</NavLink>
        </div>
      </Navbar>
      <div className='w-[1600px] h-screen p-4 mx-auto my-4'>{children}</div>
    </>
  )
}
