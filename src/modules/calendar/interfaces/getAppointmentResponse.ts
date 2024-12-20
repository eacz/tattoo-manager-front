export interface getAppointmentResponse {
  ok: boolean
  appointments: AppointmentSimplified[]
  total: number
}

export interface AppointmentSimplified {
  id: number
  start: Date
  end: Date
  title: string
  status: 'pending' | 'finished' | 'cancelled'
}
