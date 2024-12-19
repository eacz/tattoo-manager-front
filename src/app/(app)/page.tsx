import { getAppointments } from '@/actions'
import { CalendarHandler } from '@/modules/calendar'
import dayjs from 'dayjs'

export default async function Home() {
  const { appointments } = await getAppointments({
    endDate: dayjs().endOf('month').toDate(),
    startDate: dayjs().startOf('month').toDate(),
  })

  return (
    <div className=''>
      <CalendarHandler appointments={appointments} />
    </div>
  )
}
