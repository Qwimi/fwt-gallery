import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useAuthStore } from './authStore';
import type { Genre } from './types';
import { handleGetFilterableGenres, handleGetGenres, handleGetGenresStatic } from '@/api/main';
import handleError from '@/helpers/errorHandling';

export const useGenresStore = defineStore('genres', () => {
  const authStore = useAuthStore();
  // genres

  const genres: Ref<Genre[]> = ref([]);
  const filterableGenres: Ref<Genre[]> = ref([]);

  const getGenres = async () => {
    try {
      genres.value = authStore.isUserAuth ? await handleGetGenres() : await handleGetGenresStatic();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const getFilterableGenres = async () => {
    const genresIdList = await handleGetFilterableGenres();

    genresIdList.forEach((element: string) => {
      if (!element) return;

      filterableGenres.value.push(genres.value.find((genre: Genre) => genre._id == element));
    });
  };

  getGenres();

  return {
    genres,
    filterableGenres,
    getFilterableGenres,
    getGenres
  };
});
