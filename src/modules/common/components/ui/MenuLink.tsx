'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  text: string
  url: string
}

export const MenuLink = ({ text, url }: Props) => {
  const pathname = usePathname()

  return (
    <Link className={clsx('', { 'font-bold': url === pathname })} href={url}>
      {text}
    </Link>
  )
}
