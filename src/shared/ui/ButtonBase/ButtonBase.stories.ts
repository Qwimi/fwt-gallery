import type { Meta, StoryObj } from '@storybook/vue3'

import ButtonBase from './ButtonBase.vue'

const meta: Meta<typeof ButtonBase> = {
  title: 'components/button/BattonBase',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'round', 'underline', 'icon']
    },
    default: String
  },
  component: ButtonBase
}

export default meta

type Story = StoryObj<typeof meta>

export const ButtonDefault: Story = {
  args: {
    default: 'button',
    variant: 'default'
  }
}

export const ButtonUnderline: Story = {
  args: {
    default: 'button',
    variant: 'underline'
  }
}

export const ButtonRound: Story = {
  args: {
    default: 'button',
    variant: 'round'
  }
}
