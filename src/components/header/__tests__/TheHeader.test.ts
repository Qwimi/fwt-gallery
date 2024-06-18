import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheHeader from '@/components/header/TheHeader.vue'
import { RouterLink } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { createPinia } from 'pinia'

describe('Header tests', () => {
  it('Header render test', () => {
    useModalStore(createPinia())
    const wrapper = shallowMount(TheHeader, {
      components: {
        RouterLink
      }
    })
    const headerComponent = wrapper.findComponent(TheHeader)
    expect(headerComponent.exists()).toBe(true)
  })
})
