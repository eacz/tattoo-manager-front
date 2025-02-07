import { auth } from '@/auth.config'
import { Menu } from '@/modules/common'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (new Date() > new Date(session?.expires!) || !session?.user) {
    redirect('/auth/login')
  }
  return (
    <main className='flex items-center justify-center flex-col w-100'>
      <Menu />
      {children}
    </main>
  )
}
