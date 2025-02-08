'use server'

import tattooManagerApi from '@/lib/axios'
import { Schedule, workdaysType } from '@/modules/schedules'

interface Payload {
  schedulesHours: string[]
  workdays: workdaysType[]
}

export const createSchedule = async (payload: Payload) => {
  try {
    const { data } = await tattooManagerApi.post<Schedule>(`/schedule`, payload)

    return { ok: true, schedule: data }
  } catch (error: any) {
    console.log(error)

    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
