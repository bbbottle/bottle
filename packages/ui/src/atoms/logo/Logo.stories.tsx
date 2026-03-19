import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Colored: Story = {
  args: {
    className: 'text-content-primary',
  },
};

export const Secondary: Story = {
  args: {
    className: 'text-content-secondary',
  },
};

export const Clickable: Story = {
  args: {
    className: 'text-content-action cursor-pointer hover:opacity-80',
    onClick: () => alert('Logo clicked!'),
  },
};
