import { defineStore } from 'pinia'
import type { Artist, ArtistPage, CardInterface, Painting } from './types'
import { ref, type Ref } from 'vue'
import { getArtistsStatic, getCurrentArtistStatic } from '@/api/main'

export const useAppStore = defineStore('app', () => {
  const artists: Ref<Array<Artist>> = ref([])
  const artistCards: Ref<Array<CardInterface>> = ref([])
  const currentArtist: Ref<ArtistPage> = ref({} as ArtistPage)
  const currentArtistCards: Ref<Array<CardInterface>> = ref([])

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

  const setCurrentArtistCards = () => {
    currentArtistCards.value = currentArtist.value.paintings.map((painting: Painting) => {
      return {
        id: painting._id,
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
      await getArtistsStatic().then((data) => {
        artists.value = data
      })
      setAuthorCards()
    } catch (error) {
      console.error(error)
    }
  }

  const getCurrentArtist = async (id: String) => {
    try {
      await getCurrentArtistStatic(id).then((data) => {
        currentArtist.value = data
        currentArtist.value.avatar.src = `${import.meta.env.VITE_BASE_URL}${currentArtist.value.avatar.src2x}`
      })
      setCurrentArtistCards()
    } catch (error) {
      console.error(error)
    }
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
