import Link from 'next/link'
import { Menu, Search, ShoppingCart, UserRound } from 'lucide-react'
import { NavLink } from './NavLink'
import Logo from './Logo'

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-primary text-primary-foreground'>
      <div className='w-full flex py-2 px-4 items-center justify-between gap-4 mx-auto min-w-[320px] max-w-[1600px]'>
        <button className='md:hidden'>
          <Menu />
        </button>
        <Logo />
        <nav className='hidden space-x-4 md:flex'>
          <NavLink href='/'>HOME</NavLink>
          <NavLink href='/products'>PRODUCTS</NavLink>
          <NavLink href='/profile'>PROFILE</NavLink>
          <NavLink href='/admin'>Dashboard</NavLink>
          <NavLink href='/admin/products'>КНИГИ</NavLink>
          <NavLink href='/admin/users'>КОРИСТУВАЧІ</NavLink>
          <NavLink href='/admin/orders'>Sales</NavLink>
          <NavLink href='/admin/discounts'>Coupons</NavLink>
        </nav>
        <div className='flex space-x-4 '>
          <Search />
          <button className='relative'>
            <ShoppingCart />
            <span className='absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-amber-500 rounded-full -top-1 -right-1 '>
              2
            </span>
          </button>
          <Link href='auth/sign-in'>
            <UserRound />
          </Link>
        </div>
      </div>
    </header>
  )
}
