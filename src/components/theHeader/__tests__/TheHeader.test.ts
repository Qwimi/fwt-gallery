import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { RouterLink } from 'vue-router'

import TheHeader from '@/components/theHeader'
import { useModalStore } from '@/stores/modalStore'

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
