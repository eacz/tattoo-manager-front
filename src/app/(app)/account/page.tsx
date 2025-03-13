import { getUserInfo } from '@/actions'
import { Configuration, customCookies, LogoutButton, ShowUserInfo } from '@/modules/account'
import { cookies } from 'next/headers'

export default async function Account() {
  const { user, ok } = await getUserInfo()
  const currentLang = cookies().get('lang')?.value || 'en'
  const currentTheme = cookies().get('theme')?.value || 'light'

  if (!ok || !user) {
    return <div>error</div>
  }

  const setCookies = async (values: customCookies) => {
    'use server'
    cookies().set('lang', values.lang)
    cookies().set('theme', values.theme)

  }

  return (
    <div className='md:max-w-[var(--md)] lg:max-w-[var(--lg)] flex-1 flex justify-between'>
      <ShowUserInfo user={user} />
      <div className='flex flex-col justify-between gap-2'>
        <Configuration currentLang={currentLang} currentTheme={currentTheme} setCookies={setCookies} />
        <LogoutButton />
      </div>
    </div>
  )
}
