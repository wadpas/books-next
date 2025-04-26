import { Loader2 } from 'lucide-react'

export function AdminLoading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin'></div>
    </div>
  )
}

export function AdminLoading2() {
  return (
    <div className='flex justify-center'>
      <Loader2 className='size-24 animate-spin' />
    </div>
  )
}
