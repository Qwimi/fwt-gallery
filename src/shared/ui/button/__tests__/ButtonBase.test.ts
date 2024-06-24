import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonBase from '@/shared/ui/button'

describe('ButtonBase  tests', () => {
  it('ButtonBase render test', () => {
    const wrapper = mount(ButtonBase)
    const buttonComponent = wrapper.findComponent(ButtonBase)
    expect(buttonComponent.exists()).toBe(true)
  })
})
