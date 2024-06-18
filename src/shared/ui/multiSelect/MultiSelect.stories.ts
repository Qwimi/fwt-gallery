import type { Meta, StoryObj } from '@storybook/vue3'
import MultiSelect from './MultiSelect.vue'

const meta: Meta<typeof MultiSelect> = {
  title: 'components/inputs/MultiSelect',
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark']
    }
  },
  tags: ['autodocs'],
  component: MultiSelect
}
export default meta
type Story = StoryObj<typeof meta>

export const MultiSelectShowcase: Story = {
  args: {
    label: 'Field name',
    options: [
      { _id: '1', name: 'option 1' },
      { _id: '2', name: 'option 2' }
    ],
    theme: 'light'
  }
}
