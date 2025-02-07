import { getScheduleByUser } from '@/actions'
import { getAppointments } from '@/actions/appointments/get-appointments'
import { Calendar } from '@/modules/calendar'
import dayjs from 'dayjs'
import React from 'react'

interface Props {
  searchParams: {
    date?: string
  }
}
export default async function Home({ searchParams }: Props) {
  const { date = new Date() } = searchParams

  const { appointments } = await getAppointments({
    endDate: dayjs(date).endOf('month').toDate(),
    startDate: dayjs(date).startOf('month').toDate(),
  })

  const schedule = await getScheduleByUser()

  return (
    <>
      <Calendar appointments={appointments ?? []} schedule={schedule.schedule} />
    </>
  )
}
