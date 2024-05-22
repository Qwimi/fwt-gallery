import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CardItem from '@/components/card/CardItem.vue'
import type { CardInterface } from '@/stores/types'

vi.mock('@/components/card/CardItem.vue', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/components/card/CardItem.vue')>()
  return {
    ...mod
  }
})

describe('Card item tests', () => {
  it('Artist card render test', () => {
    const cardTestData: CardInterface = {
      id: '64e5d1edaf5d7f5991789bd8',
      name: 'Ivan Aivazovsky',
      date: '29 July 1817 – 2 May 1900',
      image: ''
    }

    const wrapper = mount(CardItem, {
      props: {
        card: cardTestData,
        isArtist: true
      }
    })

    const cardComponent = wrapper.findComponent(CardItem)
    expect(cardComponent.exists()).toBe(true)
    expect(cardComponent.props().card).toStrictEqual(cardTestData)
  })
})
