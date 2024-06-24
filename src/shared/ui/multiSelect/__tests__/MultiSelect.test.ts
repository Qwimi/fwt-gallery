import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import MultiSelect from '../MultiSelect.vue'

describe('MultiSelect tests', () => {
  it('MultiSelect render test', () => {
    const wrapper = mount(MultiSelect, {
      props: {
        label: 'Field name',
        options: [
          { _id: '1', name: 'option 1' },
          { _id: '2', name: 'option 2' }
        ]
      }
    })
    const multiSelectComponent = wrapper.findComponent(MultiSelect)
    expect(multiSelectComponent.exists()).toBe(true)
  })
})
