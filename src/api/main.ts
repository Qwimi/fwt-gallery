import { axiosInstance } from '.';
import type { AuthRequest } from '@/stores/types';

// список художников для неавторизированного пользователя

export const handleGetArtistsStatic = async () => {
  const response = await axiosInstance.get('/artists/static');

  return response.data;
};

// список художников для авторизированного пользователя

export const handleGetArtists = async () => {
  const response = await axiosInstance.get('/artists');

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
  const response = await axiosInstance.post('/artists', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  console.log(response.data);

  return response.data;
};

// обновление профиля художника

export const handleUpdareArtist = async (id: string, form: FormData) => {
  const response = await axiosInstance.put(`/artists/${id}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

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
