import VFooter from '@/components/footer/VFooter.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof VFooter> = {
  title: 'components/footer/Footer',
  tags: ['autodocs'],
  component: VFooter
}

export default meta
type Story = StoryObj<typeof meta>

export const Footer: Story = {}
