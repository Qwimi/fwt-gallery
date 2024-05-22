import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonRound from './ButtonRound.vue'

const meta: Meta<typeof ButtonRound> = {
  title: 'components/button/Icon round',
  component: ButtonRound
}
export default meta
type Story = StoryObj<typeof meta>

export const RoundButton: Story = {}
