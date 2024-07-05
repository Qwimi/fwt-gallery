import { type StoryObj, type Meta } from '@storybook/vue3'

import ExpandableText from '.'

const meta: Meta<typeof ExpandableText> = {
  title: 'components/expandableText/Expandable text',
  tags: ['autodocs'],
  component: ExpandableText
}
export default meta
type Story = StoryObj<typeof meta>

export const ShortText: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nobis aspernatur quibusdam officiis eaque commodi fuga qui. Quia, ipsa deleniti.'
  }
}

export const LongText: Story = {
  args: {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, fugiat recusandae deserunt cum, aspernatur harum, repellat deleniti molestiae earum accusantium maiores facere! Sunt incidunt cupiditate suscipit omnis esse nesciunt laboriosam laudantium dolores, eveniet corporis eaque quam sed, fugit repudiandae, animi culpa. Sequi consequatur animi deserunt numquam eius atque laudantium earum!'
  }
}
