import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isModalOpen: Ref<boolean> = ref(false)
  const currentModal: Ref<string | null> = ref(null)
  const isSidebarOpen: Ref<boolean> = ref(false)
  const currentSidebar: Ref<string | null> = ref(null)

  const openModal = (targetModal: string) => {
    isModalOpen.value = true
    currentModal.value = targetModal
  }

  const closeModal = () => {
    isModalOpen.value = false
    currentModal.value = null
  }

  const openSidebar = (targetSidebar: string) => {
    isSidebarOpen.value = true
    currentSidebar.value = targetSidebar
  }
  const closeSidebar = () => {
    isSidebarOpen.value = false
    currentSidebar.value = null
  }

  return {
    isModalOpen,
    currentModal,
    isSidebarOpen,
    currentSidebar,
    closeModal,
    openModal,
    openSidebar,
    closeSidebar
  }
})
