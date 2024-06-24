import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheFooter from '@/components/theFooter'
import { RouterLink } from 'vue-router'

describe('Footer tests', () => {
  it('Footer  render test', () => {
    const wrapper = shallowMount(TheFooter, {
      components: {
        RouterLink
      }
    })
    const footerComponent = wrapper.findComponent(TheFooter)
    expect(footerComponent.exists()).toBe(true)
  })
})
