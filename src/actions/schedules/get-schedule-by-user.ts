'use server'

import tattooManagerApi from '@/lib/axios'
import { Schedule } from '@/modules/schedules'

export const getScheduleByUser = async () => {
  try {
    const { data } = await tattooManagerApi.get<Schedule>(`/schedule`)

    return { ok: true, schedule: data }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
