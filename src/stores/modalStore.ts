import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isModalOpen: Ref<boolean> = ref(false)
  const currentModal: Ref<string | null> = ref(null)
  const isSidebarOpen: Ref<boolean> = ref(false)
  const currentSidebar: Ref<string | null> = ref(null)
  const currentModalProps: Ref<any> = ref(null)
  const toastMessage: Ref<string | null> = ref(null)

  const openModal = (targetModal: string, props?: any) => {
    isModalOpen.value = true
    currentModal.value = targetModal
    currentModalProps.value = props
    document.documentElement.classList.add('no-scroll')
  }

  const closeModal = () => {
    isModalOpen.value = false
    currentModal.value = null
    currentModalProps.value = null
    document.documentElement.classList.remove('no-scroll')
  }

  const openSidebar = (targetSidebar: string) => {
    isSidebarOpen.value = true
    currentSidebar.value = targetSidebar
    document.documentElement.classList.add('no-scroll')
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
    currentSidebar.value = null
    document.documentElement.classList.remove('no-scroll')
  }

  return {
    isModalOpen,
    currentModal,
    currentModalProps,
    isSidebarOpen,
    currentSidebar,
    toastMessage,
    closeModal,
    openModal,
    openSidebar,
    closeSidebar
  }
})
