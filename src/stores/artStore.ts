import { defineStore } from 'pinia'
import type { Artist, CardInterface } from './types'
import { ref, type Ref } from 'vue'
import { getArtistsStatic } from '@/api/api_requests'

export const useAppStore = defineStore('app', () => {
  const artists: Ref<Array<Artist>> = ref([])
  const artistCards: Ref<Array<CardInterface>> = ref([])

  async function getArtists() {
    try {
      await getArtistsStatic().then((data) => {
        artists.value = data
      })
      setAuthorCards()
    } catch (error) {
      console.error(error)
    }
  }

  function setAuthorCards() {
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

  return { getArtists, artistCards }
})
