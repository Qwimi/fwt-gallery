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
    artists.value.forEach((artist: Artist) => {
      let url = null
      if (artist.mainPainting) {
        url = artist.mainPainting.image.src
      }
      artistCards.value.push({
        id: artist._id,
        name: artist.name,
        date: artist.yearsOfLife,
        image: url
      })
    })
  }

  return { getArtists, artistCards, artists }
  // const artists: Ref<Array<Artist>> = ref([])
  // const artistCards: Ref<Array<CardInterface>> = ref([])
  // const paintingCards: Ref<Array<CardInterface>> = ref([])
  // async function getArtists() {}
  // state: () => ({
  //   artists: [] as Artist[],
  //   artistCards: [] as CardInterface[],
  //   paintingCards: [] as CardInterface[]
  // }),
  // actions: {
  //   async getArtists() {
  //     const response = await axios.get('https://internship-front.framework.team/artists/static')
  //     this.artists = response.data
  //     this.getAuthorCards()
  //   },
  //   getAuthorCards() {
  //     this.artists.forEach((artist: Artist) => {
  //       let url = null
  //       if (artist.mainPainting) {
  //         url = artist.mainPainting.image.src
  //       }
  //       this.artistCards.push({
  //         id: artist._id,
  //         name: artist.name,
  //         date: artist.yearsOfLife,
  //         image: url
  //       })
  //     })
  //   }
  // }
})
