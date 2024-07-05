import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TheTextarea from '../TheTextarea.vue'

describe('Textarea tests', () => {
  it('Textarea render test', () => {
    const wrapper = mount(TheTextarea, { props: { label: 'label' } })
    const textareaComponent = wrapper.findComponent(TheTextarea)
    expect(textareaComponent.exists()).toBe(true)
  })
})
