'use server'

import axios from 'axios'

const tattooManagerApi = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' },
  withCredentials: true,
})

const isServer = typeof window === 'undefined'

tattooManagerApi.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers')
    const token = cookies().get('token')?.value

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } else {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }

  return config
})

export default tattooManagerApi
