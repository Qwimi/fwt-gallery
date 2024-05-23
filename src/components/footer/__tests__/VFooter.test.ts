import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VFooter from '@/components/footer/VFooter.vue'
import { RouterLink } from 'vue-router'

describe('Footer tests', () => {
  it('Footer  render test', () => {
    const wrapper = shallowMount(VFooter, {
      components: {
        RouterLink
      }
    })
    const footerComponent = wrapper.findComponent(VFooter)
    expect(footerComponent.exists()).toBe(true)
  })
})
