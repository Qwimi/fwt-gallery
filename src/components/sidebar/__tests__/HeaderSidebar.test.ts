import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HeaderSidebar from '@/components/sidebar/HeaderSidebar.vue'
import { createPinia } from 'pinia'
import { useModalStore } from '@/stores/modalStore'

describe('Header sidebar tests', () => {
  it('Header sidebar render test', () => {
    useModalStore(createPinia())
    const wrapper = shallowMount(HeaderSidebar)
    const headerSidebar = wrapper.findComponent(HeaderSidebar)
    expect(headerSidebar.exists()).toBe(true)
  })
})
