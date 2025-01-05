'use server'

import tattooManagerApi from '@/lib/axios'

export const deleteAppointment = async (id: number) => {
  try {
    await tattooManagerApi.delete<{ ok: true }>(`/appointment/${id}`)

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
