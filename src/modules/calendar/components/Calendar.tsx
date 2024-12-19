'use client'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useCallback, useMemo, useState } from 'react'
import { Calendar, dayjsLocalizer, SlotInfo, View, Views } from 'react-big-calendar'

import { CalendarEvent } from '../interfaces/CalendarEvent'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dayjs/locale/en'

dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

interface Props {
  appointments?: CalendarEvent[]
}
export const CalendarHandler = ({appointments}: Props) => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>(Views.MONTH)
  console.log(appointments);
  

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
    console.log('onSelectSlot');

    console.log(slot)
  }

  const onSelectEvent = (event: CalendarEvent) => {
    console.log('onSelectEvent');
    console.log(event)
  }

  return (
    <div>
      <Calendar
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
      />
    </div>
  )
}
