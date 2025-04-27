import { Loader } from 'lucide-react'

export default function AdminLoading() {
  return (
    <div className='flex items-center justify-center'>
      <Loader className='size-24 animate-spin' />
    </div>
  )
}
