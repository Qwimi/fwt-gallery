import type { Meta, StoryObj } from '@storybook/vue3'
import TheInput from './TheInput.vue'

const meta: Meta<typeof TheInput> = {
  title: 'components/inputs/Inputs',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password']
    },
    theme: {
      control: 'select',
      options: ['light', 'dark']
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
    value: '',
    theme: 'light',
    error: ''
  }
}

export const InputWithError: Story = {
  args: {
    label: 'Error',
    type: 'Error',
    placeholder: 'Error',
    theme: 'light',
    error: 'error message'
  }
}

export const PasswordInput: Story = {
  args: {
    label: 'password',
    type: 'password',
    value: 'password',
    placeholder: 'password',
    theme: 'light'
  }
}
