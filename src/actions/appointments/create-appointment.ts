'use server'

import tattooManagerApi from '@/lib/axios'
import { CreateAppointmentResponse, getAppointmentResponse } from '@/modules/calendar'

interface Payload {
  title: string
  price: number
  earnestMoney?: number
  notes?: string
  dateStart: string
  dateEnd: string
}

export const createAppointment = async (payload: Payload) => {
  try {
    const { data } = await tattooManagerApi.post<CreateAppointmentResponse>(`/appointment`, payload)
    console.log(data)

    return {
      ok: true,
      appointment: data.appointment,
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
