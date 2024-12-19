'use server'

import tattooManagerApi from '@/lib/axios'
import { getAppointmentResponse } from '@/modules/calendar'

interface Payload {
  endDate: Date
  startDate: Date
  limit?: number
  offset?: number
}

export const getAppointments = async (payload: Payload) => {
  const { endDate, startDate, limit = 100, offset = 0 } = payload
  try {
    const { data } = await tattooManagerApi.get<getAppointmentResponse>(
      `/appointment?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    )
    console.log(data)

    return { ok: true, appointments: data.appointments.map((app) => ({ ...app, end: new Date(app.end), start: new Date(app.start) })) }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
