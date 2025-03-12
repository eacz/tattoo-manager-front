import { GetUserResponse } from '@/modules/auth/interfaces'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

interface Props {
  user: GetUserResponse
}
export const ShowUserInfo = ({ user }: Props) => {
  const t = useTranslations('accountPage')

  return (
    <div>
      <p>
        <span className='font-bold'>{t('fields.name')}: </span> {user.name}
      </p>
      <p>
        <span className='font-bold'>{t('fields.email')}:</span> {user.email}
      </p>
      <p>
        <span className='font-bold'>{t('fields.username')}:</span> {user.username}
      </p>
      <p>
        <span className='font-bold'>{t('fields.accountCreated')}:</span>{' '}
        {dayjs(user.createdAt).format('DD/MM/YYYY')}
      </p>
    </div>
  )
}
