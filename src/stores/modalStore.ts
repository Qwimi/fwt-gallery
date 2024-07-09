import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const currentModal: Ref<string | null> = ref(null);
  const currentSidebar: Ref<string | null> = ref(null);
  const currentModalProps: Ref<any> = ref(null);
  const toastMessage: Ref<string | null> = ref(null);

  const openModal = (targetModal: string, props?: any) => {
    currentModal.value = targetModal;
    currentModalProps.value = props;
    document.documentElement.classList.add('no-scroll');
  };

  const closeModal = () => {
    currentModal.value = null;
    currentModalProps.value = null;
    document.documentElement.classList.remove('no-scroll');
  };

  const openSidebar = (targetSidebar: string) => {
    currentSidebar.value = targetSidebar;
    document.documentElement.classList.add('no-scroll');
  };

  const closeSidebar = () => {
    currentSidebar.value = null;
    document.documentElement.classList.remove('no-scroll');
  };

  const setToastMessage = (error: string | null) => {
    toastMessage.value = error;

    if (!error) return;

    setTimeout(() => setToastMessage(null), 5000);
  };

  const getToastMessage = () => toastMessage.value;

  return {
    currentModal,
    currentModalProps,
    currentSidebar,
    closeModal,
    openModal,
    openSidebar,
    closeSidebar,
    setToastMessage,
    getToastMessage
  };
});
