'use server'

import tattooManagerApi from '@/lib/axios'
import { getAppointmentByIdResponse, getAppointmentResponse } from '@/modules/calendar'

export const getAppointmentById = async (id: number) => {
  try {
    const {
      data: { appointment },
    } = await tattooManagerApi.get<getAppointmentByIdResponse>(`/appointment/${id}`)

    return {
      ok: true,
      appointment,
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
