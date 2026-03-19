import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const defaultPaths = [{ name: '~', path: '/' }, { name: 'ext', path: '/ext' }, { name: 'txt' }];

const pathsWithCn = [
  { name: '~', path: '/' },
  { name: 'ext', path: '/ext' },
  { name: 'txt', path: '/txt' },
  { name: '与或非禁区' },
];

const pathsWithMultiCnWords = [
  { name: '~', path: '/' },
  { name: 'ext', path: '/ext' },
  { name: '图片', path: '/png' },
  { name: '县城' },
];

export const Default: Story = {
  args: {
    paths: defaultPaths,
  },
};

export const WithChineseWords: Story = {
  args: {
    paths: pathsWithCn,
  },
};

export const WithMultiChineseWords: Story = {
  args: {
    paths: pathsWithMultiCnWords,
  },
};

export const Loading: Story = {
  args: {
    paths: defaultPaths,
    loading: true,
  },
};
