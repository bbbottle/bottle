import type { Meta, StoryObj } from '@storybook/react';
import { Article } from './Article';

const meta: Meta<typeof Article> = {
  title: 'Molecules/Article',
  component: Article,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '文章标题',
    children: <p className="text-content-primary">这是文章内容。可以包含任意 React 节点。</p>,
  },
};

export const WithDate: Story = {
  args: {
    title: '带日期的文章',
    date: '2024-01-15',
    children: <p className="text-content-primary">这篇文章带有发布日期。</p>,
  },
};

export const WithDescription: Story = {
  args: {
    title: '带描述的文章',
    description: '这是文章的描述/摘要部分',
    children: <p className="text-content-primary">这是文章的详细内容。</p>,
  },
};

export const Loading: Story = {
  args: {
    title: '加载中',
    loading: true,
    children: <p className="text-content-secondary">内容正在加载中...</p>,
  },
};
