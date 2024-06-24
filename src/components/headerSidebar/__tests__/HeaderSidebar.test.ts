import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import HeaderSidebar from '@/components/headerSidebar/HeaderSidebar.vue'
import { useModalStore } from '@/stores/modalStore'

describe('Header sidebar tests', () => {
  it('Header sidebar render test', () => {
    useModalStore(createPinia())
    const wrapper = shallowMount(HeaderSidebar)
    const headerSidebar = wrapper.findComponent(HeaderSidebar)
    expect(headerSidebar.exists()).toBe(true)
  })
})
