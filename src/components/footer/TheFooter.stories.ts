import TheFooter from '@/components/footer/TheFooter.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof TheFooter> = {
  title: 'components/footer/Footer',
  tags: ['autodocs'],
  component: TheFooter
}

export default meta
type Story = StoryObj<typeof meta>

export const Footer: Story = {}
