export interface getAppointmentResponse {
  ok: boolean
  appointments: Appointment[]
  total: number
}

export interface Appointment {
  id: number
  start: Date
  end: Date
  title: string
  status: 'pending' | 'finished' | 'cancelled'
}
