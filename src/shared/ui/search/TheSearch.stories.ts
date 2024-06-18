import type { Meta, StoryObj } from '@storybook/vue3'
import TheSearch from './TheSearch.vue'

const meta: Meta<typeof TheSearch> = {
  title: 'components/inputs/The Search',
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark']
    }
  },
  tags: ['autodocs'],
  component: TheSearch
}
export default meta
type Story = StoryObj<typeof meta>

export const Search: Story = {
  args: {
    placeholder: 'search...',
    theme: 'light',
    error: ''
  }
}

export const SearchWithError: Story = {
  args: {
    placeholder: 'error',
    theme: 'light',
    error: 'error message'
  }
}
