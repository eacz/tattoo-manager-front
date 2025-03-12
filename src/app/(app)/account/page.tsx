import { getUserInfo } from '@/actions'
import { ShowUserInfo } from '@/modules/account'
import dayjs from 'dayjs'
import { getTranslations } from 'next-intl/server'

export default async function Account() {
  const t = await getTranslations('accountPage')
  const { user, ok } = await getUserInfo()

  if (!ok || !user) {
    return <div>error</div>
  }

  return (
    <div className='md:max-w-[var(--md)] lg:max-w-[var(--lg)] flex-1 flex justify-between'>
      <ShowUserInfo user={user} />
      <div className='flex flex-col justify-between gap-2'>
        <button className='button-primary'>{t('buttons.config')}</button>
        <button className='button-delete'>{t('buttons.logout')}</button>
      </div>
    </div>
  )
}
