import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Nav } from './Nav';

const meta: Meta<typeof Nav> = {
  title: 'Molecules/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    paths: [{ name: '~', path: '/' }, { name: 'ext', path: '/ext' }, { name: 'txt' }],
  },
};

export const Loading: Story = {
  args: {
    paths: [
      { name: '~', path: '/' },
      { name: 'loading', path: '/loading' },
    ],
    loading: true,
  },
};

export const Mini: Story = {
  args: {
    paths: [{ name: 'ext', path: '/ext' }, { name: 'txt' }],
    mini: true,
  },
};
