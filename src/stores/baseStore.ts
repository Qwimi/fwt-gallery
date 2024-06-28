import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

import { useAuthStore } from './authStore'
import type { Artist, ArtistPage, CardInterface, Genre, Painting } from './types'

import {
  handleDeletArtist,
  handleGetArtists,
  handleGetArtistsStatic,
  handleGetCurrentArtist,
  handleGetCurrentArtistStatic,
  handleGetGenres,
  handleGetGenresStatic
} from '@/api/main'

export const useAppStore = defineStore('app', () => {
  const artists: Ref<Array<Artist>> = ref([])
  const artistCards: Ref<Array<CardInterface>> = ref([])
  const currentArtist: Ref<ArtistPage> = ref({} as ArtistPage)
  const currentArtistCards: Ref<Array<CardInterface>> = ref([])
  const genres: Ref<Array<Genre>> = ref([])

  const authStore = useAuthStore()

  const setCurrentArtistCards = () => {
    currentArtistCards.value = currentArtist.value.paintings.map((painting: Painting) => {
      return {
        id: painting.artist,
        name: painting.name,
        date: painting.yearOfCreation,
        image: painting.image && `${import.meta.env.VITE_BASE_URL}${painting.image.src}`,
        image2x: painting.image && `${import.meta.env.VITE_BASE_URL}${painting.image.src2x}`
      }
    })
  }

  const unmountCurrentArtist = () => {
    currentArtist.value = {} as ArtistPage
    currentArtistCards.value = []
  }

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
      }
    })
  }

  const getArtists = async () => {
    try {
      if (authStore.isUserAuth) {
        const request = await handleGetArtists()
        artists.value = request.data
      } else {
        artists.value = await handleGetArtistsStatic()
      }
      setAuthorCards()
    } catch (error) {
      console.error(error)
    }
  }

  const getCurrentArtist = async (id: String) => {
    try {
      currentArtist.value = authStore.isUserAuth
        ? await handleGetCurrentArtist(id)
        : await handleGetCurrentArtistStatic(id)

      currentArtist.value.avatar.src = `${import.meta.env.VITE_BASE_URL}${currentArtist.value.avatar.src2x}`

      setCurrentArtistCards()
    } catch (error) {
      console.error(error)
    }
  }

  const getGenres = async () => {
    try {
      genres.value = authStore.isUserAuth ? await handleGetGenres() : await handleGetGenresStatic()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteArtist = async (id: string) => {
    try {
      return await handleDeletArtist(id)
    } catch (error) {
      console.error(error)
      return
    }
  }

  return {
    artistCards,
    genres,
    currentArtist,
    currentArtistCards,
    unmountCurrentArtist,
    getCurrentArtist,
    getArtists,
    getGenres,
    deleteArtist
  }
})
