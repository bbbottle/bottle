import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpiral } from './LoadingSpiral';

const meta = {
  title: 'Organisms/LoadingSpiral',
  component: LoadingSpiral,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoadingSpiral>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const Fast = {
  args: {
    step: 0.2,
  },
} satisfies Story;

export const Slow = {
  args: {
    step: 0.03,
  },
} satisfies Story;
