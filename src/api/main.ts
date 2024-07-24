import { axiosInstance } from '.';
import type { Artist, ArtistFilters, AuthRequest } from '@/stores/types';

// список художников для неавторизированного пользователя

export const handleGetArtistsStatic = async () => {
  const response = await axiosInstance.get('/artists/static');

  return response.data;
};

// список художников для авторизированного пользователя

export const handleGetArtists = async (
  page: number,
  cardsPerPage: number,
  filters?: ArtistFilters | null
) => {
  const response = await axiosInstance.get('/artists', {
    params: {
      perPage: cardsPerPage,
      pageNumber: page,
      sortBy: 'name',
      ...filters
    }
  });

  return response.data;
};

// профиль художника для неавторизированного пользователя

export const handleGetCurrentArtistStatic = async (id: string) => {
  const response = await axiosInstance.get(`/artists/static/${id}`);

  return response.data;
};

// профиль художника для авторизированного пользователя

export const handleGetCurrentArtist = async (id: string) => {
  const response = await axiosInstance.get(`/artists/${id}`);

  return response.data;
};

// удаление художника

export const handleDeletArtist = async (id: string) => {
  const response = await axiosInstance.delete(`/artists/${id}`);

  return response.data;
};

// создание художника

export const handleCreateArtist = async (form: FormData) => {
  const response = await axiosInstance.post('/artists', form);

  return response.data;
};

// обновление профиля художника

export const handleUpdateArtist = async (id: string, form: FormData) => {
  const response = await axiosInstance.put(`/artists/${id}`, form);

  return response.data;
};

// получение жанров для авторизированного пользователя

export const handleGetGenres = async () => {
  const response = await axiosInstance.get(`/genres`);

  return response.data;
};

// получение жанров для неавторизированного пользователя

export const handleGetGenresStatic = async () => {
  const response = await axiosInstance.get(`/genres/static`);

  return response.data;
};

// получение жанров, по которым можно осуществить поиск

export const handleGetFilterableGenres = async () => {
  const { data } = (await axiosInstance.get(`/artists`)).data;
  const genresIdList = new Set();
  data.map((elem: Artist) => {
    elem.genres.forEach((genre: string) => genresIdList.add(genre));
  });

  return Array.from(genresIdList);
};

// создание картины

export const handleCreatePainting = async (id: string, form: FormData) => {
  const response = await axiosInstance.post(`/artists/${id}/paintings`, form);

  return response.data;
};

// обновление картины

export const handleUpdatePainting = async (id: string, paintingId: string, form: FormData) => {
  const response = await axiosInstance.put(`/artists/${id}/paintings/${paintingId}`, form);

  return response.data;
};

// обновление главной картины художника

export const handleUpdateMainPainting = async (id: string, paintingId: string) => {
  const response = await axiosInstance.patch(`/artists/${id}/main-painting`, {
    mainPainting: paintingId
  });

  return response.data;
};

// удаление картины

export const handleDeletePainting = async (id: string, paintingId: string) => {
  const response = await axiosInstance.delete(`/artists/${id}/paintings/${paintingId}`);

  return response.data;
};

//auth

export const handleRegister = async (user: AuthRequest) => {
  const response = await axiosInstance.post(`/auth/register`, user);

  return response.data;
};

export const handleLogin = async (user: AuthRequest) => {
  const response = await axiosInstance.post(`/auth/login`, user);

  return response.data;
};

export const handleRefresh = async (fingerprint: string, refreshToken: string) => {
  const response = await axiosInstance.post(`/auth/refresh`, {
    fingerprint: fingerprint,
    refreshToken: refreshToken
  });

  return response.data;
};
