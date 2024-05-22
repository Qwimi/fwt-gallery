import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VSidebar from '@/components/sidebar/VSidebar.vue'

describe('Sidebar tests', () => {
  it('Sidebar render test', () => {
    const wrapper = mount(VSidebar)
    const sidebarComponent = wrapper.findComponent(VSidebar)
    expect(sidebarComponent.exists()).toBe(true)
  })
})
