import { SimpleAppointment } from "./appointment"

export interface getAppointmentResponse {
  ok: boolean
  appointments: SimpleAppointment[]
  total: number
}
