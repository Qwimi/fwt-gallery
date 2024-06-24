import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, it, expect } from 'vitest'

import CardList from '@/shared/ui/cardList'
import { useAppStore } from '@/stores/artStore'

describe('Card list tests', () => {
  it('Artist cardlist test', () => {
    const store = useAppStore(createPinia())
    store.getArtists()
    const cardsTestData = store.artistCards
    const wrapper = mount(CardList, { props: { cards: store.artistCards, isArtists: true } })
    const cardlistComponent = wrapper.findComponent(CardList)
    expect(cardlistComponent.exists()).toBe(true)
    expect(cardlistComponent.props().cards).toBe(cardsTestData)
  })
})
