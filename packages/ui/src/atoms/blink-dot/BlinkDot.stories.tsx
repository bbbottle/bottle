import type { Meta, StoryObj } from '@storybook/react';
import { BlinkDot } from './BlinkDot';

const meta: Meta<typeof BlinkDot> = {
  title: 'Atoms/BlinkDot',
  component: BlinkDot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['blink', 'still', 'hidden'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'blink',
  },
};

export const Blink: Story = {
  args: {
    status: 'blink',
  },
};

export const Still: Story = {
  args: {
    status: 'still',
  },
};

export const Hidden: Story = {
  args: {
    status: 'hidden',
  },
};
