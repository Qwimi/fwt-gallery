import { defineStore } from 'pinia'
import type { Artist, ArtistPage, CardInterface, Painting } from './types'
import { ref, type Ref } from 'vue'
import { getArtistsStatic, getCurrentArtistStatic } from '@/api/api_requests'

export const useAppStore = defineStore('app', () => {
  const artists: Ref<Array<Artist>> = ref([])
  const artistCards: Ref<Array<CardInterface>> = ref([])
  const currentArtist: Ref<ArtistPage> = ref({} as ArtistPage)
  const currentArtistCards: Ref<Array<CardInterface>> = ref([])

  const getArtists = async () => {
    try {
      await getArtistsStatic().then((data) => {
        artists.value = data
      })
      setAuthorCards()
    } catch (error) {
      console.error(error)
    }
  }

  const setAuthorCards = () => {
    artistCards.value = artists.value.map((artist: Artist) => {
      let url = null
      if (artist.mainPainting) {
        url = artist.mainPainting.image.src
      }
      return {
        id: artist._id,
        name: artist.name,
        date: artist.yearsOfLife,
        image: url ? `${import.meta.env.VITE_BASE_URL}${url}` : null
      }
    })
  }

  const getCurrentArtist = async (id: String) => {
    try {
      await getCurrentArtistStatic(id).then((data) => {
        currentArtist.value = data
        currentArtist.value.avatar.src = `${import.meta.env.VITE_BASE_URL}${currentArtist.value.avatar.src}`
      })
      setCurrentArtistCards()
    } catch (error) {
      console.error(error)
    }
  }

  const unmountCurrentArtist = () => {
    currentArtist.value = {} as ArtistPage
    currentArtistCards.value = []
  }

  const setCurrentArtistCards = () => {
    currentArtistCards.value = currentArtist.value.paintings.map((painting: Painting) => {
      return {
        id: painting._id,
        name: painting.name,
        date: painting.yearOfCreation,
        image: painting.image.src ? `${import.meta.env.VITE_BASE_URL}${painting.image.src}` : null
      }
    })
  }

  return {
    artistCards,
    currentArtist,
    currentArtistCards,
    unmountCurrentArtist,
    getCurrentArtist,
    getArtists
  }
})
