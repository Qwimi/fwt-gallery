import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ButtonDefault from '../ButtonDefault.vue'

describe('Default button  tests', () => {
  it('Default button render test', () => {
    const wrapper = mount(ButtonDefault)
    const buttonComponent = wrapper.findComponent(ButtonDefault)
    expect(buttonComponent.exists()).toBe(true)
  })
})
