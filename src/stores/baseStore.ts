import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import { useAuthStore } from './authStore';
import { useModalStore } from './modalStore';
import type { Artist, ArtistPage, CardInterface, Genre, Painting } from './types';

import {
  handleCreateArtist,
  handleDeletArtist,
  handleGetArtists,
  handleGetArtistsStatic,
  handleGetCurrentArtist,
  handleGetCurrentArtistStatic,
  handleGetGenres,
  handleGetGenresStatic,
  handleUpdateArtist
} from '@/api/main';
import handleError from '@/helpers/errorHandling';

export const useAppStore = defineStore('app', () => {
  const artists: Ref<Array<Artist>> = ref([]);
  const artistCards: Ref<Array<CardInterface>> = ref([]);
  const currentArtist: Ref<ArtistPage> = ref({} as ArtistPage);
  const currentArtistCards: Ref<Array<CardInterface>> = ref([]);
  const genres: Ref<Array<Genre>> = ref([]);

  const authStore = useAuthStore();
  const modalStore = useModalStore();

  // cards

  const setCurrentArtistCards = () => {
    currentArtistCards.value = currentArtist.value.paintings.map((painting: Painting) => {
      return {
        id: painting.artist,
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

  const deleteArtist = async (id: string) => {
    try {
      await handleDeletArtist(id);
      getArtists();
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

  return {
    artistCards,
    genres,
    currentArtist,
    currentArtistCards,
    unmountCurrentArtist,
    getCurrentArtist,
    getArtists,
    getGenres,
    deleteArtist,
    createArtist,
    updateArtist
  };
});
