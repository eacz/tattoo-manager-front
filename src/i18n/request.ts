'use server'
import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

const cookiesNext = cookies()
export default getRequestConfig(async () => {
  const lang = cookiesNext.get('lang')
  const locale = lang?.value || 'en'

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
