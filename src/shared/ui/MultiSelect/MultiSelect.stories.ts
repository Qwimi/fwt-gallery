import type { Meta, StoryObj } from '@storybook/vue3'

import MultiSelect from './MultiSelect.vue'

const meta: Meta<typeof MultiSelect> = {
  title: 'components/inputs/MultiSelect',
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
      { _id: '2', name: 'option 2' },
      { _id: '3', name: 'option 3' },
      { _id: '4', name: 'option 4' },
      { _id: '5', name: 'option 5' },
      { _id: '6', name: 'option 6' }
    ]
  }
}
