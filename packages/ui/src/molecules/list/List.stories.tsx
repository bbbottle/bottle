import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { List, TitledList, LinkList } from './List';

const meta: Meta<typeof List> = {
  title: 'Molecules/List',
  component: List,
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

const sampleItems = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    itemRenderer: (item: (typeof sampleItems)[0]) => (
      <span className="text-content-primary">{item.name}</span>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleItems,
    horizontal: true,
    itemRenderer: (item: (typeof sampleItems)[0]) => (
      <span className="text-content-primary px-2 py-1">{item.name}</span>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    items: sampleItems,
    footer: <span className="text-content-secondary">Footer content</span>,
    itemRenderer: (item: (typeof sampleItems)[0]) => (
      <span className="text-content-primary">{item.name}</span>
    ),
  },
};

export const Titled: StoryObj<typeof TitledList> = {
  render: () => (
    <TitledList
      title="列表标题"
      description="这是一个带标题的列表"
      items={sampleItems}
      itemRenderer={(item: (typeof sampleItems)[0]) => (
        <span className="text-content-primary">{item.name}</span>
      )}
    />
  ),
};

export const Links: StoryObj<typeof LinkList> = {
  render: () => (
    <LinkList
      title="链接列表"
      description="常用链接"
      links={[
        { to: '/', children: '首页' },
        { to: '/about', children: '关于' },
        { to: 'https://github.com', children: 'GitHub', external: true },
      ]}
    />
  ),
};
