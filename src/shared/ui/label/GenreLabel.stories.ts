import type { Meta, StoryObj } from '@storybook/vue3'
import GenreLabel from './GenreLabel.vue'

const meta: Meta<typeof GenreLabel> = {
  title: 'components/label/Genre Label',
  tags: ['autodocs'],
  component: GenreLabel
}

export default meta
type Story = StoryObj<typeof meta>

export const Label: Story = {
  args: {
    default: 'genre label'
  }
}
