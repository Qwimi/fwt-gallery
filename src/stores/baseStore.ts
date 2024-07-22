import { defineStore } from 'pinia';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { useAuthStore } from './authStore';
import { useModalStore } from './modalStore';
import type { Artist, ArtistFilters, ArtistPage, CardInterface, Genre, Painting } from './types';
import {
  handleCreateArtist,
  handleCreatePainting,
  handleDeletArtist,
  handleDeletePainting,
  handleGetArtists,
  handleGetArtistsStatic,
  handleGetCurrentArtist,
  handleGetCurrentArtistStatic,
  handleGetFilterableGenres,
  handleGetGenres,
  handleGetGenresStatic,
  handleUpdateArtist,
  handleUpdateMainPainting,
  handleUpdatePainting
} from '@/api/main';
import handleError from '@/helpers/errorHandling';
import router from '@/router';

export const useAppStore = defineStore('app', () => {
  // stores

  const authStore = useAuthStore();
  const modalStore = useModalStore();

  // infinite scroll

  const artistCount: Ref<number> = ref(0);
  const pageCounter: Ref<number> = ref(1);
  const isArtistListExpandable = computed(() => artistCount.value > artistCards.value.length);

  // filters
  const filter: Ref<ArtistFilters | null> = ref(null);

  const filterArtists = async (form: ArtistFilters) => {
    filter.value = form;
    getArtists();
    modalStore.closeSidebar();
  };

  const getSearchString = () => filter.value?.name;

  const setSearchString = (search?: string) => {
    filter.value = { name: search };
    getArtists();
  };

  // main page

  const artists: Ref<Artist[]> = ref([]);

  const artistCards: ComputedRef<CardInterface[]> = computed(() => {
    return artists.value.map((artist: Artist) => {
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
  });

  const getArtists = async () => {
    try {
      if (authStore.isUserAuth) {
        pageCounter.value = 1;
        const response = await handleGetArtists(pageCounter.value, filter.value);
        artists.value = response.data;

        artistCount.value = response.meta.count;
      } else {
        artists.value = await handleGetArtistsStatic();
      }
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const loadMore = async () => {
    pageCounter.value++;
    const newArtist = await handleGetArtists(pageCounter.value, filter.value);
    artists.value = artists.value.concat(newArtist.data);
  };

  // artist profile

  const currentArtist: Ref<ArtistPage | null> = ref(null);

  const currentArtistCards: ComputedRef<CardInterface[] | undefined> = computed(() => {
    return currentArtist.value?.paintings.map((painting: Painting) => {
      return {
        id: painting._id,
        name: painting.name,
        date: painting.yearOfCreation,
        image: painting.image && `${import.meta.env.VITE_BASE_URL}${painting.image.src}`,
        image2x: painting.image && `${import.meta.env.VITE_BASE_URL}${painting.image.src2x}`
      };
    });
  });

  const getCurrentArtist = async (id: string) => {
    try {
      currentArtist.value = authStore.isUserAuth
        ? await handleGetCurrentArtist(id)
        : await handleGetCurrentArtistStatic(id);
      if (currentArtist.value?.avatar) {
        currentArtist.value.avatar.src = `${import.meta.env.VITE_BASE_URL}${currentArtist.value.avatar.src2x}`;
      }
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const unmountCurrentArtist = () => {
    currentArtist.value = null;
  };

  // pagination

  const currentPaginationPage: Ref<number> = ref(1);

  const paginationPagesCount = computed(() => Math.ceil(currentArtistCards.value?.length! / 6));

  const currentPaginationView = computed(() => {
    if (currentPaginationPage.value > paginationPagesCount.value) {
      currentPaginationPage.value = paginationPagesCount.value;
    }

    return currentArtistCards.value!.slice(
      6 * (currentPaginationPage.value - 1),
      6 * currentPaginationPage.value
    );
  });

  // artist interactions

  const deleteArtist = async () => {
    try {
      await handleDeletArtist(currentArtist.value?._id!);
      getArtists();
      router.push({ name: 'home' });
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

  // paintings interactions

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
      const isSuccess = await handleDeletePainting(currentArtist.value?._id!, id);
      getCurrentArtist(currentArtist.value?._id!);
      modalStore.closeModal();

      return Boolean(isSuccess);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  // main painting interactions

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

  return {
    artistCards,
    genres,
    filterableGenres,
    currentArtist,
    currentArtistCards,
    isArtistListExpandable,
    paginationPagesCount,
    currentPaginationView,
    currentPaginationPage,
    getSearchString,
    setSearchString,
    loadMore,
    getFilterableGenres,
    filterArtists,
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
