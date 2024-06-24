import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheSearch from '../TheSearch.vue'

describe('Search tests', () => {
  it('Search render test', () => {
    const wrapper = mount(TheSearch)
    const searchComponent = wrapper.findComponent(TheSearch)
    expect(searchComponent.exists()).toBe(true)
  })
})
