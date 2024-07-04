import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import GenreLabel from '../GenreLabel.vue'

describe('GenreLabel  tests', () => {
  it('GenreLabel render test', () => {
    const wrapper = mount(GenreLabel, { props: { genre: { _id: '1', name: 'genre' } } })
    const genreComponent = wrapper.findComponent(GenreLabel)
    expect(genreComponent.exists()).toBe(true)
  })
})
