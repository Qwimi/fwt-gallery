import { axiosInstance } from './api_instaces'

export const getArtistsStatic = async () => {
  const response = await axiosInstance.get('/artists/static')
  return response.data
}
