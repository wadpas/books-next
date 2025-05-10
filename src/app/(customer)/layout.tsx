import { Navbar, NavLink } from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function Layout({ children }: { children: React.ReactNode }) {
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
          <NavLink href='/'>Home</NavLink>
          <NavLink href='/products'>Products</NavLink>
          <NavLink href='/profile'>Profile</NavLink>
        </div>
      </Navbar>
      <div className='w-[1600px] h-screen mx-auto p-4 my-4'>{children}</div>
    </>
  )
}
