import { axiosInstance } from '.'

export const getArtistsStatic = async () => {
  const response = await axiosInstance.get('/artists/static')
  return response.data
}
