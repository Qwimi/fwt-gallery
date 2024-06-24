import type { Meta, StoryObj } from '@storybook/vue3'

import TheInput from '.'

const meta: Meta<typeof TheInput> = {
  title: 'components/inputs/The Input',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password']
    }
  },
  tags: ['autodocs'],
  component: TheInput
}
export default meta
type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  args: {
    label: 'text',
    type: 'text',
    placeholder: 'text',
    error: ''
  }
}

export const InputWithError: Story = {
  args: {
    label: 'Error',
    type: 'Error',
    placeholder: 'Error',
    error: 'error message'
  }
}
