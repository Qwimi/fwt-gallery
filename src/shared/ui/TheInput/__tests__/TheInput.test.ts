import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheInput from '../TheInput.vue'

describe('Input tests', () => {
  it('Input render test', () => {
    const wrapper = mount(TheInput, { props: { label: 'label', type: 'text' } })
    const inputComponent = wrapper.findComponent(TheInput)
    expect(inputComponent.exists()).toBe(true)
  })
})
