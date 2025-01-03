import { FullAppointment } from "./appointment";

export interface getAppointmentByIdResponse {
  ok:          boolean;
  appointment: FullAppointment;
}

