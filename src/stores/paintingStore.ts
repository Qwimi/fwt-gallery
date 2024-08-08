import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useArtistStore } from './artistStore';
import { useModalStore } from './modalStore';
import {
  handleCreatePainting,
  handleDeletePainting,
  handleUpdateMainPainting,
  handleUpdatePainting
} from '@/api/main';
import handleError from '@/helpers/errorHandling';

export const usePaintingStore = defineStore('paintings', () => {
  // stores

  const appStore = useArtistStore();
  const modalStore = useModalStore();

  //currentArtist

  const currentArtistId = computed(() => appStore.currentArtist?._id!);

  // paintings interactions

  const createPainting = async (form: FormData) => {
    try {
      const response = await handleCreatePainting(currentArtistId.value, form);
      appStore.getCurrentArtist(currentArtistId.value);
      modalStore.closeModal();

      return response;
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const updatePainting = async (form: FormData, paintingId: string) => {
    try {
      await handleUpdatePainting(currentArtistId.value, paintingId, form);
      appStore.getCurrentArtist(currentArtistId.value);
      modalStore.closeModal();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const deletePicture = async (id: string) => {
    try {
      await handleDeletePainting(currentArtistId.value, id);
      appStore.getCurrentArtist(currentArtistId.value);
      modalStore.closeModal();
    } catch (error: unknown) {
      handleError(error);
    }
  };

  // main painting interactions

  const setMainPainting = async (paintingId: string) => {
    try {
      await handleUpdateMainPainting(currentArtistId.value, paintingId);
      appStore.getArtists();
      appStore.getCurrentArtist(currentArtistId.value);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const createMainPainting = async (form: FormData) => {
    try {
      const response = await createPainting(form);
      if (response) setMainPainting(response?._id);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  return {
    createPainting,
    setMainPainting,
    createMainPainting,
    updatePainting,
    deletePicture
  };
});
