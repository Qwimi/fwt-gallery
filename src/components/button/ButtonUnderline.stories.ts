import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonUnderline from './ButtonUnderline.vue'

const meta: Meta<typeof ButtonUnderline> = {
  title: 'components/button/Button with underline',
  tags: ['autodocs'],
  component: ButtonUnderline
}

export default meta
type Story = StoryObj<typeof meta>
export const UnderlineButton: Story = {
  args: {
    default: 'underline button'
  }
}

export const UnderlineButtonWithIcon: Story = {
  args: {
    default: 'underline button',
    icon: '📚'
  }
}
