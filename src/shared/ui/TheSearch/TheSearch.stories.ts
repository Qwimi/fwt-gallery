import type { Meta, StoryObj } from '@storybook/vue3'

import TheSearch from './TheSearch.vue'

const meta: Meta<typeof TheSearch> = {
  title: 'components/inputs/The Search',
  tags: ['autodocs'],
  component: TheSearch
}
export default meta
type Story = StoryObj<typeof meta>

export const Search: Story = {
  args: {
    placeholder: 'search...',
    error: ''
  }
}

export const SearchWithError: Story = {
  args: {
    placeholder: 'error',
    error: 'error message'
  }
}
