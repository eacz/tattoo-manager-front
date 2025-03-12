import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { MenuLink } from './MenuLink'

export const Menu = () => {
  const t = useTranslations('menu')

  const menuOptions = useMemo(
    () => [
      {
        text: t('calendar'),
        url: '/',
      },
      {
        text: t('schedule'),
        url: '/schedule',
      },
      //{
      //  text: t('clients'),
      //  url: '/clients',
      //},
      //{
      //  text: t('stadistics'),
      //  url: '/stadistics',
      //},
      {
        text: t('account'),
        url: '/account',
      },
    ],
    []
  )

  return (
    <div
      className='flex justify-center items-center gap-2 py-2 shadow pb-2 bg-foreground'
      style={{ width: '100% !important' }}>
      {menuOptions.map((option) => (
        <MenuLink key={option.url} {...option} />
      ))}
    </div>
  )
}
