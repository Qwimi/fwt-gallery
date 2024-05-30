import type { Meta, StoryObj } from '@storybook/vue3'
import TheHeader from '@/components/header/TheHeader.vue'

const meta: Meta<typeof TheHeader> = {
  title: 'components/header/Header',
  tags: ['autodocs'],
  component: TheHeader
}

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {}
