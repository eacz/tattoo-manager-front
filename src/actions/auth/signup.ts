'use server'

import { tattooManagerApi } from '@/lib/axios'
import { AuthResponse } from '@/modules/auth/interfaces'

interface Payload {
  email: string
  name: string
  password: string
}

export const signup = async (payload: Payload) => {
  try {
    const { data } = await tattooManagerApi.post<AuthResponse>(`/auth/signup`, payload)
    const { token, user } = data
    return { ok: true, token, user, message: 'Register successfully' }
  } catch (error: any) {
    console.log()
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
