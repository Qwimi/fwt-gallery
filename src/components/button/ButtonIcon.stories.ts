import type { Meta, StoryObj } from '@storybook/vue3'
import ButtonIcon from './ButtonIcon.vue'
import IconDelete from '../icons/IconDelete.vue'

const meta: Meta<typeof ButtonIcon> = {
  title: 'components/button/Icon button',
  tags: ['autodocs'],
  component: ButtonIcon,
  render: (args) => ({
    components: { ButtonIcon, IconDelete },
    setup() {
      return { args }
    },
    template: `
      <button-icon>
        <icon-delete />
      </button-icon>
    `
  })
}
export default meta
type Story = StoryObj<typeof meta>

export const IconButton: Story = {}
