import type { Meta, StoryObj } from '@storybook/vue3'
import TheCheckbox from './TheCheckbox.vue'

const meta: Meta<typeof TheCheckbox> = {
  title: 'components/inputs/The Checkbox',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark']
    }
  },
  component: TheCheckbox
}

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox: Story = {
  args: {
    theme: 'light'
  }
}

export const CheckboxWithLabel: Story = {
  args: {
    label: 'label',
    theme: 'light'
  }
}
