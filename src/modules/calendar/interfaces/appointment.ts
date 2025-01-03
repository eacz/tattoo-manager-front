export interface SimpleAppointment {
  id: number
  start: Date
  end: Date
  title: string
  status: 'pending' | 'finished' | 'cancelled'
}

export interface FullAppointment {
  id: number
  dateStart: string
  dateEnd: string
  title: string
  status: string
  price: number
  earnestMoney: number
  notes: string
  createdAt: Date
  updatedAt: Date
}
