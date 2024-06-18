import type { Meta, StoryObj } from '@storybook/vue3'
import CardItem from './CardItem.vue'

const meta: Meta<typeof CardItem> = {
  title: 'components/card/Card item',
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark']
    }
  },
  tags: ['autodocs'],
  component: CardItem
}
export default meta
type Story = StoryObj<typeof meta>

export const ArtistCard: Story = {
  args: {
    card: {
      id: '64e5d1edaf5d7f5991789bd8',
      name: 'Ivan Aivazovsky',
      date: '29 July 1817 – 2 May 1900',
      image: 'https://internship-front.framework.team/images/64e5d1f4af5d7f5991789c57/image.jpg',
      image2x: 'https://internship-front.framework.team/images/64e5d1f4af5d7f5991789c57/image.jpg'
    },
    theme: 'light'
  }
}

export const ArtistCardWithNoImage: Story = {
  args: {
    card: {
      id: '64e5d1edaf5d7f5991789bd8',
      name: 'Ivan Aivazovsky',
      date: '29 July 1817 – 2 May 1900',
      image: null,
      image2x: null
    },
    theme: 'light'
  }
}

export const ArtistCardWithLoadingError: Story = {
  args: {
    card: {
      id: '64e5d1edaf5d7f5991789bd8',
      name: 'Ivan Aivazovsky',
      date: '29 July 1817 – 2 May 1900',
      image: '/images/64e5d1f4af5d7f5991789c57/image.jp',
      image2x: '/images/64e5d1f4af5d7f5991789c57/image.jp'
    },
    theme: 'light'
  }
}
