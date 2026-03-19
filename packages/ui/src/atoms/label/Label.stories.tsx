import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '标签文本',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">邮箱</Label>
      <input
        id="email"
        type="email"
        placeholder="请输入邮箱"
        className="flex h-10 w-full rounded-md border border-border bg-background px-3 text-foreground"
      />
    </div>
  ),
};
