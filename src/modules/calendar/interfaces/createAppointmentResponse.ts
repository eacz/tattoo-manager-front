export interface CreateAppointmentResponse {
  ok:          boolean;
  appointment: Appointment;
}

export interface Appointment {
  dateStart:    Date;
  dateEnd:      Date;
  title:        string;
  price:        number;
  user:         User;
  earnestMoney: null;
  notes:        null;
  id:           number;
  status:       string;
  createdAt:    Date;
  updatedAt:    Date;
}

export interface User {
  id:        number;
  username:  string;
  name:      string;
  email:     string;
  active:    boolean;
  createdAt: Date;
  updatedAt: Date;
}
