'use server'

import tattooManagerApi from '@/lib/axios'
import {} from '@/modules/calendar'
import { FullAppointment } from '@/modules/calendar/interfaces/appointment'

interface Payload extends Partial<FullAppointment> {}

export const updateAppointment = async (id: number, payload: Payload) => {
  try {
    await tattooManagerApi.patch<{ ok: boolean }>(`/appointment/${id}`, payload)
    return {
      ok: true,
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
