'use client'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar as BCalendar, dayjsLocalizer, SlotInfo, View, Views } from 'react-big-calendar'
import { useLocale, useTranslations } from 'next-intl'

import { CalendarEvent } from '../interfaces/CalendarEvent'

import dayjs from 'dayjs'
//TODO: investigate how import locales dynamically
import 'dayjs/locale/es'
import 'dayjs/locale/en'
import { CreateAppointment } from './CreateAppointment'

const localizer = dayjsLocalizer(dayjs)

interface Props {
  appointments: CalendarEvent[]
}
export const Calendar = ({ appointments }: Props) => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>(Views.MONTH)
  const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] = useState(false)
  const [startDate, setStartDate] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('calendarPage.calendarMessages')
  const locale = useLocale()
  dayjs.locale(locale)

  const onNavigate = useCallback(
    (newDate: Date) => {
      const params = new URLSearchParams(searchParams)
      params.set('date', newDate.toISOString())
      router.push(`?${params.toString()}`)

      setDate(newDate)
    },
    [setDate]
  )
  const onView = useCallback(
    (newView: View) => {
      setView(newView)
    },
    [setView]
  )

  const { messages } = useMemo(
    () => ({
      messages: {
        week: t('week'),
        work_week: t('work_week'),
        day: t('day'),
        month: t('month'),
        previous: t('previous'),
        next: t('next'),
        today: t('today'),
        agenda: t('agenda'),
        showMore: (total: number) => t('showMore', { total }),
      },
    }),
    []
  )

  const onSelectSlot = (slot: SlotInfo) => {
    setStartDate(dayjs(slot.start).format('YYYY-MM-DD'))
    setIsCreateAppointmentModalOpen(true)
  }

  const onSelectEvent = (event: CalendarEvent) => {
    console.log('onSelectEvent')
    console.log(event)
  }

  return (
    <div>
      <BCalendar
        localizer={localizer}
        events={appointments}
        style={{ height: 800 }}
        date={date}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        messages={messages}
        selectable
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        defaultView='month'
      />
      <CreateAppointment
        isModalOpen={isCreateAppointmentModalOpen}
        setActive={setIsCreateAppointmentModalOpen}
        startDate={startDate}
      />
    </div>
  )
}