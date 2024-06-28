import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const authStore = useAuthStore()

    if (error.response.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true
      console.log(originalRequest)

      try {
        await authStore.refreshTokens()
        originalRequest.headers.Authorization = `Bearer ${authStore.getAccessToken()}`
        return axiosInstance(originalRequest)
      } catch (e) {
        authStore.logout()
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  }
)
