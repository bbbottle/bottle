import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '请输入内容...',
  },
};

export const WithValue: Story = {
  args: {
    value: '已输入的内容',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '禁用状态',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: '小尺寸输入框',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: '大尺寸输入框',
  },
};
