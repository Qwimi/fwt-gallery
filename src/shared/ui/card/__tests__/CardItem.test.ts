import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CardItem from '@/shared/ui/card/CardItem.vue'
import type { CardInterface } from '@/stores/types'
import { RouterLink } from 'vue-router'

describe('Card item tests', () => {
  const cardTestData: CardInterface = {
    id: '64e5d1edaf5d7f5991789bd8',
    name: 'Ivan Aivazovsky',
    date: '29 July 1817 – 2 May 1900',
    image: '',
    image2x: ''
  }

  const wrapper = shallowMount(CardItem, {
    props: {
      card: cardTestData,
      isArtist: true
    },
    components: {
      RouterLink
    }
  })

  it('Artist card render test', () => {
    const cardComponent = wrapper.findComponent(CardItem)
    expect(cardComponent.exists()).toBe(true)
    expect(cardComponent.props().card).toStrictEqual(cardTestData)
  })
})
