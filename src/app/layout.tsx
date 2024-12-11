import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

import './globals.css'
import { Providers } from '@/modules/common/components/providers/Providers'

export const metadata: Metadata = {
  title: 'TattooManager',
  description: 'App to manage your tattoo artist agenda',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
