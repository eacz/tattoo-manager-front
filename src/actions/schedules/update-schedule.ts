'use server'

import tattooManagerApi from '@/lib/axios'
import { workdaysType } from '@/modules/schedules'

interface Payload {
  schedulesHours: string[]
  workdays: workdaysType[]
}

export const updateSchedule = async (payload: Payload) => {
  try {
    await tattooManagerApi.patch<{ ok: boolean }>(`/schedule`, payload)

    return { ok: true }
  } catch (error: any) {
    console.log(error)

    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
