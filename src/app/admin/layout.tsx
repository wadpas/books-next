import { Nav, NavLink } from '@/components/Nav'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav>
        <div className='w-[1600px] flex px-4 mx-auto text-primary-foreground bg-primary'>
          <Link href='/'>
            <Image
              src='/logo.svg'
              width={200}
              height={0}
              alt='Picture of the author'
              className='mt-4 mr-6'
            />
          </Link>
          <NavLink href='/admin'>Dashboard</NavLink>
          <NavLink href='/admin/products'>Products</NavLink>
          <NavLink href='/admin/users'>Customers</NavLink>
          <NavLink href='/admin/orders'>Sales</NavLink>
        </div>
      </Nav>
      <div className='w-[1600px] h-screen mx-auto p-4'>{children}</div>
    </>
  )
}
