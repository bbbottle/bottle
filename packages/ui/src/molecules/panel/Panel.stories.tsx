import type { Meta, StoryObj } from '@storybook/react';
import { Panel } from './Panel';

const meta: Meta<typeof Panel> = {
  title: 'Molecules/Panel',
  component: Panel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h3 className="text-lg font-medium text-content-primary">面板标题</h3>
        <p className="text-content-secondary mt-2">这是面板内容</p>
      </div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-content-primary font-medium">项目</span>
          <span className="text-content-secondary">12</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-content-primary font-medium">任务</span>
          <span className="text-content-secondary">48</span>
        </div>
      </div>
    ),
  },
};
