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
    default: String
  },
  component: ButtonBase
}

export default meta

type Story = StoryObj<typeof meta>

export const ButtonWithoutIcon: Story = {
  args: {
    default: 'button',
    variant: 'default'
  }
}
