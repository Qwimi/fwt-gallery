import { defineStore } from 'pinia';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { useAuthStore } from './authStore';
import { useModalStore } from './modalStore';
import type { Artist, ArtistFilters, ArtistPage, CardInterface, Painting } from './types';
import {
  handleCreateArtist,
  handleDeletArtist,
  handleGetArtists,
  handleGetArtistsStatic,
  handleGetCurrentArtist,
  handleGetCurrentArtistStatic,
  handleUpdateArtist
} from '@/api/main';
import handleError from '@/helpers/errorHandling';
import router from '@/router';

export const useArtistStore = defineStore('artist', () => {
  const isCardsLoading: Ref<boolean> = ref(false);
  const isPageLoading: Ref<boolean> = ref(true);
  // stores

  const authStore = useAuthStore();
  const modalStore = useModalStore();

  // load mode button

  const artistCount: Ref<number> = ref(0);
  const cardsPerMainPage: Ref<number> = ref(6);
  const pageCounter: Ref<number> = ref(1);
  const isArtistListExpandable = computed(() => artistCount.value > artistCards.value.length);

  // filters

  const filter: Ref<ArtistFilters | null> = ref(null);
  const isFiltersUsed = computed(() => !!filter.value);

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
      isCardsLoading.value = true;

      if (!authStore.isUserAuth) {
        artists.value = await handleGetArtistsStatic();

        return;
      }

      pageCounter.value = 1;
      const response = await handleGetArtists(
        pageCounter.value,
        cardsPerMainPage.value,
        filter.value
      );
      artists.value = response.data;
      artistCount.value = response.meta.count;
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setTimeout(() => (isCardsLoading.value = false), 1000);
    }
  };

  const loadMore = async () => {
    try {
      isCardsLoading.value = true;
      pageCounter.value++;
      const newArtist = await handleGetArtists();
      pageCounter.value, cardsPerMainPage.value, filter.value;
      artists.value = artists.value.concat(newArtist.data);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setTimeout(() => (isCardsLoading.value = false), 1000);
    }
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
      isCardsLoading.value = true;
      currentArtist.value = authStore.isUserAuth
        ? await handleGetCurrentArtist(id)
        : await handleGetCurrentArtistStatic(id);
      if (currentArtist.value?.avatar) {
        currentArtist.value.avatar.src = `${import.meta.env.VITE_BASE_URL}${currentArtist.value.avatar.src2x}`;
      }
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setTimeout(() => (isCardsLoading.value = false), 1000);
    }
  };

  const unmountCurrentArtist = () => (currentArtist.value = null);

  // pagination at profile page

  const checkWidth = (windowWidth: number) => {
    if (windowWidth < 768) return 4;
    else if (windowWidth < 1440) return 8;
    else return 9;
  };
  const cardsPerProfilePage: Ref<number> = ref(checkWidth(window.innerWidth));
  window.addEventListener('resize', () => {
    cardsPerProfilePage.value = checkWidth(window.innerWidth);
  });
  const currentPaginationPage: Ref<number> = ref(1);
  const paginationPagesCount = computed(() =>
    Math.ceil(currentArtistCards.value?.length! / cardsPerProfilePage.value)
  );

  const currentPaginationView = computed(() => {
    if (currentPaginationPage.value > paginationPagesCount.value) {
      currentPaginationPage.value = paginationPagesCount.value;
    }

    return currentArtistCards.value!.slice(
      cardsPerProfilePage.value * (currentPaginationPage.value - 1),
      cardsPerProfilePage.value * currentPaginationPage.value
    );
  });

  // artist interactions

  const deleteArtist = async () => {
    try {
      await handleDeletArtist(currentArtist.value?._id!);
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

  return {
    artistCards,
    currentArtist,
    currentArtistCards,
    isArtistListExpandable,
    paginationPagesCount,
    currentPaginationView,
    currentPaginationPage,
    isFiltersUsed,
    isCardsLoading,
    isPageLoading,
    getSearchString,
    setSearchString,
    loadMore,
    filterArtists,
    unmountCurrentArtist,
    getCurrentArtist,
    getArtists,
    deleteArtist,
    createArtist,
    updateArtist
  };
});
