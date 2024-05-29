import { axiosInstance } from './api_instaces'

export const getArtistsStatic = async () => {
  const response = await axiosInstance.get('/artists/static')
  return response.data
}

export const getCurrentArtistStatic = async (id: String) => {
  const response = await axiosInstance.get(`/artists/static/${id}`)
  return response.data
}
