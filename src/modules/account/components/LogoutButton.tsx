'use client'

import { useTranslations } from 'next-intl'
import { logout } from '@/actions'

export const LogoutButton = () => {
  const t = useTranslations('accountPage')

  const onLogout = async () => {
    await logout()
    window.location.replace('/auth/login')
  }

  return (
    <button className='button-delete' onClick={() => onLogout()}>
      {t('buttons.logout')}
    </button>
  )
}
