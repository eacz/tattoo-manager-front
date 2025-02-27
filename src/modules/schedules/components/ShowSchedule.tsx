import { useTranslations } from 'next-intl'
import { Schedule } from '../interfaces/schedule'
import { UpdateSchedule } from './UpdateSchedule'

interface Props {
  schedule: Schedule
}

export const ShowSchedule = ({ schedule }: Props) => {
  const t = useTranslations()

  return (
    <div className='flex flex-col w-100 gap-y-1 py-2'>
      <p className='font-bold'>{t('schedulePage.showSchedule.workingDays')}</p>
      <div className='flex flex-wrap gap-2 mb-2'>
        {schedule.workdays.map((workday) => (
          <p>{t(`days.${workday}`)}</p>
        ))}
      </div>

      <p className='font-bold'>{t('schedulePage.showSchedule.workingHours')}</p>
      <div className='flex flex-wrap gap-2 mb-2'>
        {schedule.schedulesHours.map((hour) => (
          <p>{hour}</p>
        ))}
      </div>
      <UpdateSchedule schedule={schedule} />
    </div>
  )
}
