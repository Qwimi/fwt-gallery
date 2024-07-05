import type { Meta, StoryObj } from '@storybook/vue3';

import TheTextarea from '.';

const meta: Meta<typeof TheTextarea> = {
  title: 'components/inputs/The Textarea',
  tags: ['autodocs'],
  component: TheTextarea
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Textarea: Story = {
  args: {
    label: 'textarea'
  }
};

export const TextareaWithError: Story = {
  args: {
    label: 'textarea',
    error: 'error message'
  }
};
