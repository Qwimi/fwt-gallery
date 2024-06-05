import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { useAppStore } from '@/stores/artStore'
import { createPinia } from 'pinia'
import CardList from '@/components/cardList/CardList.vue'

describe('Card list tests', () => {
  it('Artist cardlist test', () => {
    const store = useAppStore(createPinia())
    store.getArtists()
    const cardsTestData = store.artistCards
    const wrapper = mount(CardList, { props: { cards: cardsTestData } })
    const cardlistComponent = wrapper.findComponent(CardList)
    expect(cardlistComponent.exists()).toBe(true)
    expect(cardlistComponent.props().cards).toBe(cardsTestData)
  })
})
