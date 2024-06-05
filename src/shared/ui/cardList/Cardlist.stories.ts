import { type StoryObj, type Meta } from '@storybook/vue3'
import CardList from './CardList.vue'

const meta: Meta<typeof CardList> = {
  title: 'components/cardlist/Card list',
  tags: ['autodocs'],
  component: CardList
}
export default meta
type Story = StoryObj<typeof meta>

export const ArtistCardList: Story = {}
