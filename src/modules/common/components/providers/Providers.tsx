import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

interface Props {
  children: React.ReactNode
}
export const Providers = async ({ children }: Props) => {
  {
    children
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider>{children}</SessionProvider>
    </NextIntlClientProvider>
  )
}
