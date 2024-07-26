import { type StoryObj, type Meta } from '@storybook/vue3';
import { createPinia } from 'pinia';

import CardList from './CardList.vue';

import { useArtistStore } from '@/stores/artistStore';

const meta: Meta<typeof CardList> = {
  title: 'components/cardlist/Card list',
  tags: ['autodocs'],
  component: CardList
};
export default meta;
type Story = StoryObj<typeof meta>;

const store = useArtistStore(createPinia());
store.getArtists();
const cardsTestData = store.artistCards;

export const ArtistCardList: Story = {
  args: {
    cards: cardsTestData
  }
};
