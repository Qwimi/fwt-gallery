import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonIcon from '@/components/button/ButtonIcon.vue'

describe('Icon Button tests', () => {
  it('Icon button render test', () => {
    const wrapper = mount(ButtonIcon)
    const buttonComponent = wrapper.findComponent(ButtonIcon)
    expect(buttonComponent.exists()).toBe(true)
  })
})
