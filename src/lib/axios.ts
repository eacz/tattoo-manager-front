import axios from 'axios'

export const tattooManagerApi = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: { 'Cache-Control': 'no-cache' },
})

//TODO: this doesn't work, investigate how to fix it
export const setToken = (token: string) => {
  tattooManagerApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeToken = () => {
  delete tattooManagerApi.defaults.headers.common['Authorization']
}
