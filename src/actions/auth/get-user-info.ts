'use server'

import tattooManagerApi from '@/lib/axios'
import { GetUserResponse } from '@/modules/auth/interfaces'

export const getUserInfo = async () => {
  try {
    const { data } = await tattooManagerApi.get<GetUserResponse>(`/auth/user-info`)
    
    return { ok: true, user: data }
  } catch (error: any) {
    console.log()
    return {
      ok: false,
      message: error?.response?.data?.message || 'Unknown error, contact support',
    }
  }
}
