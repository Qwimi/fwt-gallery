import type { Meta, StoryObj } from '@storybook/vue3'

import GenreLabel from './GenreLabel.vue'

const meta: Meta<typeof GenreLabel> = {
  title: 'components/label/Genre Label',
  tags: ['autodocs'],
  argTypes: {
    deletable: {
      control: 'boolean'
    }
  },
  component: GenreLabel
}

export default meta
type Story = StoryObj<typeof meta>

export const Label: Story = {
  args: {
    genre: {
      _id: '1',
      name: 'genre'
    }
  }
}

export const DeletableLabel: Story = {
  args: {
    genre: {
      _id: '1',
      name: 'genre'
    },
    deletable: true
  }
}
