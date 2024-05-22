import type { Meta, StoryObj } from '@storybook/vue3'
import VHeader from '@/components/header/VHeader.vue'

const meta: Meta<typeof VHeader> = {
  title: 'components/header/Header',
  tags: ['autodocs'],
  component: VHeader
}

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {}
