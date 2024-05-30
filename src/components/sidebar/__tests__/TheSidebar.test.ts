import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import THeSidebar from '@/components/sidebar/TheSidebar.vue'

describe('Sidebar tests', () => {
  it('Sidebar render test', () => {
    const wrapper = mount(THeSidebar)
    const sidebarComponent = wrapper.findComponent(THeSidebar)
    expect(sidebarComponent.exists()).toBe(true)
  })
})
