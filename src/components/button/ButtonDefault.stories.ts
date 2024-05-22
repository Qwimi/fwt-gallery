import ButtonDefault from './ButtonDefault.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof ButtonDefault> = {
  title: 'components/button/Button default',
  tags: ['autodocs'],
  component: ButtonDefault
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultButton: Story = {
  args: {
    default: 'default button'
  }
}
