'use client'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useCallback, useMemo, useState } from 'react'
import { Calendar, dayjsLocalizer, SlotInfo, View, Views } from 'react-big-calendar'

import { events } from '@/app/data/events'
import { CalendarEvent } from '../interfaces/CalendarEvent'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

export const TestCalendar = () => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>(Views.MONTH)

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
  const onView = useCallback((newView: View) => setView(newView), [setView])

  const { messages } = useMemo(
    () => ({
      messages: {
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Siguiente',
        today: 'Hoy',
        agenda: 'Agenda',

        showMore: (total: number) => `+${total} más`,
      },
    }),
    []
  )

  const onSelectSlot = (slot: SlotInfo) => {
    console.log(slot)
  }

  const onSelectEvent = (event: CalendarEvent) => {
    console.log(event)
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 800 }}
        date={date}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        messages={messages}
        selectable
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
      />
    </div>
  )
}
