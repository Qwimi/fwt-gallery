import type { Meta, StoryObj } from '@storybook/vue3'

import TheCheckbox from './TheCheckbox.vue'

const meta: Meta<typeof TheCheckbox> = {
  title: 'components/inputs/The Checkbox',
  tags: ['autodocs'],
  component: TheCheckbox
}

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox: Story = {}

export const CheckboxWithLabel: Story = {
  args: {
    label: 'label'
  }
}
