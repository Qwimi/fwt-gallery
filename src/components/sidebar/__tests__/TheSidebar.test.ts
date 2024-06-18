import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import THeSidebar from '@/components/sidebar/TheSidebar.vue'
import { useModalStore } from '@/stores/modalStore'
import { createPinia } from 'pinia'

describe('Sidebar tests', () => {
  it('Sidebar render test', () => {
    useModalStore(createPinia())
    const wrapper = mount(THeSidebar)
    const sidebarComponent = wrapper.findComponent(THeSidebar)
    expect(sidebarComponent.exists()).toBe(true)
  })
})
