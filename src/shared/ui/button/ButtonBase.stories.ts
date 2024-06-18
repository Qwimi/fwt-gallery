import ButtonBase from './ButtonBase.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ButtonBase> = {
  title: 'components/button/BattonBase',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'round', 'underline', 'icon']
    },
    theme: {
      control: 'select',
      options: ['light', 'dark']
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
    variant: 'default',
    theme: 'light'
  }
}

export const ButtonUnderline: Story = {
  args: {
    default: 'button',
    variant: 'underline',
    theme: 'light'
  }
}

export const ButtonRound: Story = {
  args: {
    default: 'button',
    variant: 'round',
    theme: 'light'
  }
}
