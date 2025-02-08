import { getScheduleByUser } from '@/actions'
import { CreateSchedule } from '@/modules/schedules'

export default async function SchedulePage() {
  const scheduleResponse = await getScheduleByUser()

  return (
    <div className='md:max-w-[var(--md)] lg:max-w-[var(--lg)]'>
      {scheduleResponse.ok ? <p> show schedule and update</p> : <CreateSchedule />}
      {scheduleResponse.schedule && <pre>{JSON.stringify(scheduleResponse.schedule)}</pre>}
    </div>
  )
}
