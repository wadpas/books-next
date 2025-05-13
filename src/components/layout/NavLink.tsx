'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLink({ children, href }: { children: string; href: string }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin') && href.startsWith('/admin')
  const isCustomer = !pathname.startsWith('/admin') && !href.startsWith('/admin')

  return (
    (isAdmin || isCustomer) && (
      <Link
        href={href}
        className={cn('hover:font-bold', pathname === href && 'text-amber-400 font-extrabold')}>
        {children}
      </Link>
    )
  )
}
