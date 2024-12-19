export interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
  status: 'pending' | 'finished' | 'cancelled'
}
