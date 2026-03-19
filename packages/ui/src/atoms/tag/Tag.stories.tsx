import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'react',
    to: '/tag/react',
  },
};

export const WithPrefix: Story = {
  args: {
    children: 'design',
    to: '/tag/design',
    prefix: '@',
  },
};

export const External: Story = {
  args: {
    children: 'github',
    to: 'https://github.com',
    external: true,
  },
};

export const Readonly: Story = {
  args: {
    children: 'readonly-tag',
    readonly: true,
  },
};
