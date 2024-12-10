import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session?.user) redirect('/')
  return (
    <main className='flex justify-center items-center bg-gray-300 h-screen'>
      <div className='md:max-w-[1024px] bg-white w-full h-full max-h-[800px] rounded p-4 flex justify-center '>{children}</div>
    </main>
  )
}
