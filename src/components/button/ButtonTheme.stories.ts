import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonTheme from './ButtonTheme.vue'

const meta: Meta<typeof ButtonTheme> = {
  title: 'components/button/Icon theme',
  tags: ['autodocs'],
  args: {
    showText: false
  },
  component: ButtonTheme
}
export default meta
type Story = StoryObj<typeof meta>

export const ThemeButton: Story = {
  args: {
    showText: false
  }
}

export const ThemeButtonWithText: Story = {
  args: {
    showText: true
  }
}
