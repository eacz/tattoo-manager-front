import { getScheduleByUser } from '@/actions'
import '@/modules/common/common.css'
import { CreateSchedule, ShowSchedule } from '@/modules/schedules'

export default async function SchedulePage() {
  const scheduleResponse = await getScheduleByUser()

  return (
    <div className='md:max-w-[var(--md)] lg:max-w-[var(--lg)] w-[100%] card'>
      {scheduleResponse.ok && scheduleResponse.schedule ? (
        <ShowSchedule schedule={scheduleResponse.schedule} />
      ) : (
        <CreateSchedule />
      )}
    </div>
  )
}
