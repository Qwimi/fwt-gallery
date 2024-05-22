import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonRound from '@/components/button/ButtonRound.vue'

describe('Round Button tests', () => {
  it('Round button render test', () => {
    const wrapper = mount(ButtonRound)
    const buttonComponent = wrapper.findComponent(ButtonRound)
    expect(buttonComponent.exists()).toBe(true)
  })
})
