import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GenreLabel from '../GenreLabel.vue'

describe('GenreLabel  tests', () => {
  it('GenreLabel render test', () => {
    const wrapper = mount(GenreLabel)
    const buttonComponent = wrapper.findComponent(GenreLabel)
    expect(buttonComponent.exists()).toBe(true)
  })
})
