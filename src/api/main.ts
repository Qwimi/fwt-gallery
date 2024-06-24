import { axiosInstance } from '.'

import type { AuthRequest, RefreshRequest } from '@/stores/types'

export const getArtistsStatic = async () => {
  const response = await axiosInstance.get('/artists/static')

  return response.data
}

export const getCurrentArtistStatic = async (id: String) => {
  const response = await axiosInstance.get(`/artists/static/${id}`)

  return response.data
}

//auth

export const sentRegisterData = async (user: AuthRequest) => {
  const response = await axiosInstance.post(`/auth/register`, user)

  return response.data
}

export const sentLoginData = async (user: AuthRequest) => {
  const response = await axiosInstance.post(`/auth/login`, user)

  return response.data
}

export const getNewTokens = async (refreshRequest: RefreshRequest) => {
  const response = await axiosInstance.post(`/auth/refresh`, refreshRequest)

  return response.data
}
