import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import TheSidebar from '@/components/theSidebar'
import { useModalStore } from '@/stores/modalStore'

describe('Sidebar tests', () => {
  it('Sidebar render test', () => {
    useModalStore(createPinia())
    const wrapper = mount(TheSidebar)
    const sidebarComponent = wrapper.findComponent(TheSidebar)
    expect(sidebarComponent.exists()).toBe(true)
  })
})
