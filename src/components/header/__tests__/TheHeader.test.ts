import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheHeader from '@/components/header/TheHeader.vue'
import { RouterLink } from 'vue-router'

describe('Header tests', () => {
  it('Header render test', () => {
    const wrapper = shallowMount(TheHeader, {
      components: {
        RouterLink
      }
    })
    const headerComponent = wrapper.findComponent(TheHeader)
    expect(headerComponent.exists()).toBe(true)
  })
})
