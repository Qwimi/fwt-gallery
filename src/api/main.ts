import { axiosInstance } from '.'

import type { AuthRequest, RefreshRequest } from '@/stores/types'

// список артистов для неавторизированного пользователя

export const getArtistsStatic = async () => {
  const response = await axiosInstance.get('/artists/static')

  return response.data
}

// список артистов для авторизированного пользователя

export const getArtistsAuth = async () => {
  const response = await axiosInstance.get('/artists')

  return response.data
}

// профиль артиста для неавторизированного пользователя

export const getCurrentArtistStatic = async (id: String) => {
  const response = await axiosInstance.get(`/artists/static/${id}`)

  return response.data
}

// получение жанров для авторизированного пользователя

export const getGenresAuth = async () => {
  const response = await axiosInstance.get(`/genres`)

  return response.data
}

// получение жанров для неавторизированного пользователя

export const getGenresStatic = async () => {
  const response = await axiosInstance.get(`/genres/static`)

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
