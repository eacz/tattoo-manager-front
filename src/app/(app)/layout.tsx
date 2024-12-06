import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user || new Date() > new Date(session?.expires)) {
    redirect('/auth/login')
  }
  return (
    <main className='min-h-screen bg-gray-100'>
      <div className='mt-8'>{children}</div>
    </main>
  )
}
