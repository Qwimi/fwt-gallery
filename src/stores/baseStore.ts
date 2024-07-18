import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';

import { useAuthStore } from './authStore';
import { useModalStore } from './modalStore';
import type { Artist, ArtistPage, CardInterface, Genre, Painting } from './types';

import {
  handleCreateArtist,
  handleCreatePainting,
  handleDeletArtist,
  handleDeletePainting,
  handleGetArtists,
  handleGetArtistsStatic,
  handleGetCurrentArtist,
  handleGetCurrentArtistStatic,
  handleGetGenres,
  handleGetGenresStatic,
  handleUpdateArtist,
  handleUpdateMainPainting,
  handleUpdatePainting
} from '@/api/main';
import handleError from '@/helpers/errorHandling';
import router from '@/router';

export const useAppStore = defineStore('app', () => {
  const artists: Ref<Artist[]> = ref([]);
  const artistCards: Ref<CardInterface[]> = ref([]);
  const currentArtist: Ref<ArtistPage> = ref({} as ArtistPage);
  const currentArtistCards: Ref<CardInterface[]> = ref([]);
  const genres: Ref<Genre[]> = ref([]);
  const usingGenres = computed(() => {
    const set = new Set();
    artists.value.map((elem: Artist) => {
      elem.genres.forEach((genre: string) => set.add(genre));
    });
    return set;
  });

  const authStore = useAuthStore();
  const modalStore = useModalStore();

  // cards

  const setCurrentArtistCards = () => {
    currentArtistCards.value = currentArtist.value.paintings.map((painting: Painting) => {
      return {
        id: painting._id,
        name: painting.name,
        date: painting.yearOfCreation,
        image: painting.image && `${import.meta.env.VITE_BASE_URL}${painting.image.src}`,
        image2x: painting.image && `${import.meta.env.VITE_BASE_URL}${painting.image.src2x}`
      };
    });
  };

  const setAuthorCards = () => {
    artistCards.value = artists.value.map((artist: Artist) => {
      return {
        id: artist._id,
        name: artist.name,
        date: artist.yearsOfLife,
        image:
          artist.mainPainting && `${import.meta.env.VITE_BASE_URL}${artist.mainPainting.image.src}`,
        image2x:
          artist.mainPainting &&
          `${import.meta.env.VITE_BASE_URL}${artist.mainPainting.image.src2x}`
      };
    });
  };

  // artists

  const getArtists = async () => {
    try {
      if (authStore.isUserAuth) {
        const request = await handleGetArtists();
        artists.value = request.data;
      } else {
        artists.value = await handleGetArtistsStatic();
      }
      setAuthorCards();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const getCurrentArtist = async (id: string) => {
    try {
      currentArtist.value = authStore.isUserAuth
        ? await handleGetCurrentArtist(id)
        : await handleGetCurrentArtistStatic(id);
      if (currentArtist.value.avatar) {
        currentArtist.value.avatar.src = `${import.meta.env.VITE_BASE_URL}${currentArtist.value.avatar.src2x}`;
      }
      setCurrentArtistCards();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const deleteArtist = async () => {
    try {
      await handleDeletArtist(currentArtist.value._id);
      getArtists();
      router.push({ name: 'home' });
      modalStore.closeModal();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const createArtist = async (form: FormData) => {
    try {
      await handleCreateArtist(form);
      getArtists();
      modalStore.closeModal();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const updateArtist = async (id: string, form: FormData) => {
    try {
      await handleUpdateArtist(id, form);
      getArtists();
      getCurrentArtist(id);
      modalStore.closeModal();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const unmountCurrentArtist = () => {
    currentArtist.value = {} as ArtistPage;
    currentArtistCards.value = [];
  };

  // genres

  const getGenres = async () => {
    try {
      genres.value = authStore.isUserAuth ? await handleGetGenres() : await handleGetGenresStatic();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  // paintings

  const createPainting = async (id: string, form: FormData) => {
    try {
      const response = await handleCreatePainting(id, form);
      getCurrentArtist(id);
      modalStore.closeModal();

      return response;
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const setMainPainting = async (id: string, paintingId: string) => {
    try {
      await handleUpdateMainPainting(id, paintingId);
      getArtists();
      getCurrentArtist(id);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const createMainPainting = async (id: string, form: FormData) => {
    try {
      const response = await createPainting(id, form);
      if (response) setMainPainting(id, response?._id);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const updatePainting = async (id: string, form: FormData, paintingId: string) => {
    try {
      await handleUpdatePainting(id, paintingId, form);
      getCurrentArtist(id);
      modalStore.closeModal();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const deletePicture = async (id: string) => {
    try {
      await handleDeletePainting(currentArtist.value._id, id);
      getCurrentArtist(currentArtist.value._id);
      modalStore.closeModal();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  return {
    artistCards,
    genres,
    usingGenres,
    currentArtist,
    currentArtistCards,
    unmountCurrentArtist,
    getCurrentArtist,
    getArtists,
    getGenres,
    deleteArtist,
    createArtist,
    updateArtist,
    createPainting,
    setMainPainting,
    createMainPainting,
    updatePainting,
    deletePicture
  };
});
