import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheCheckbox from '../TheCheckbox.vue'

describe('Checkbox tests', () => {
  it('Checkbox render test', () => {
    const wrapper = mount(TheCheckbox, { props: { id: '1' } })
    const checkboxComponent = wrapper.findComponent(TheCheckbox)
    expect(checkboxComponent.exists()).toBe(true)
  })
})
