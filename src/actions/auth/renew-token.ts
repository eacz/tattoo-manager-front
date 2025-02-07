'use server'

import tattooManagerApi from '@/lib/axios'
import { AuthResponse } from '@/modules/auth/interfaces'

export const renewToken = async () => {
  try {
    const { data } = await tattooManagerApi.post<AuthResponse>(`/auth/renew-token`)
    const { token, user } = data
    return { ok: true, token, user }
  } catch (error: any) {
    console.log()
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
