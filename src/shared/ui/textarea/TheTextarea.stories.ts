import type { Meta, StoryObj } from '@storybook/vue3'
import TheTextarea from './TheTextarea.vue'

const meta: Meta<typeof TheTextarea> = {
  title: 'components/inputs/The Textarea',
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark']
    }
  },
  tags: ['autodocs'],
  component: TheTextarea
}

export default meta
type Story = StoryObj<typeof meta>

export const Textarea: Story = {
  args: {
    label: 'textarea',
    theme: 'light'
  }
}

export const TextareaWithError: Story = {
  args: {
    label: 'textarea',
    theme: 'light',
    error: 'error message'
  }
}
