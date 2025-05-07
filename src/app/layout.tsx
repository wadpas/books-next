import type { Metadata } from 'next'
import { Roboto, Lato } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Freedom',
  description: 'Freedom store',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className='h-full'>
      <body className={cn('relative h-full font-sans antialiased', roboto.className)}>
        <main className='relative flex flex-col min-h-screen'>
          <div className='flex-grow flex-1'>{children}</div>
        </main>
      </body>
    </html>
  )
}
