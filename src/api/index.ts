import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json'
  }
})

export const setupInterceptors = (
  getAccessToken: () => string,
  handleRefreshTokens: () => Promise<void>,
  logout: () => void
) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      const token = getAccessToken()

      if (token && error.response.status === 401 && !originalRequest.isRetry) {
        originalRequest.isRetry = true
        try {
          await handleRefreshTokens()
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axiosInstance(originalRequest)
        } catch (e) {
          logout()
          return Promise.reject(e)
        }
      }
      return Promise.reject(error)
    }
  )
}
