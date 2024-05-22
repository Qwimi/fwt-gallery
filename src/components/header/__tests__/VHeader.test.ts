import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VHeader from '@/components/header/VHeader.vue'

describe('Header tests', () => {
  it('Header render test', () => {
    const wrapper = shallowMount(VHeader)
    const headerComponent = wrapper.findComponent(VHeader)
    expect(headerComponent.exists()).toBe(true)
  })
})
