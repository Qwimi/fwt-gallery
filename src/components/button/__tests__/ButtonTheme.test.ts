import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonTheme from '../ButtonTheme.vue'
import { useThemeStore } from '@/stores/themeStore'
import { createPinia } from 'pinia'

describe('Theme Button tests', () => {
  it('Theme button render test', () => {
    useThemeStore(createPinia())
    const wrapper = mount(ButtonTheme)
    const buttonComponent = wrapper.findComponent(ButtonTheme)
    expect(buttonComponent.exists()).toBe(true)
  })
})
