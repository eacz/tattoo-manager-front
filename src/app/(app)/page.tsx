import { TestCalendar } from '@/modules/calendar'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('loginPage')
  return (
    <div className=''>
      <p>{t('button')}</p>
      <TestCalendar />
    </div>
  )
}
