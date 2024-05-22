import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VFooter from '@/components/footer/VFooter.vue'

describe('Footer tests', () => {
  it('Footer  render test', () => {
    const wrapper = mount(VFooter)
    const footerComponent = wrapper.findComponent(VFooter)
    expect(footerComponent.exists()).toBe(true)
  })
})
