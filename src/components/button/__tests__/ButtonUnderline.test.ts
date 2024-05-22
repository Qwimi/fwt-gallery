import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonUnderline from '@/components/button/ButtonUnderline.vue'

describe('Underline Button tests', () => {
  it('Underline button render test', () => {
    const wrapper = mount(ButtonUnderline)
    const buttonComponent = wrapper.findComponent(ButtonUnderline)
    expect(buttonComponent.exists()).toBe(true)
  })
})
