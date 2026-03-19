import type { Meta, StoryObj } from '@storybook/react';
import { DropImage } from './DropImage';

const meta: Meta<typeof DropImage> = {
  title: 'Organisms/DropImage',
  component: DropImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUploader = async (file: File) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, fileName: file.name };
};

export const Default: Story = {
  args: {
    uploader: mockUploader,
    placeholder: <div className="text-content-secondary text-center">拖拽图片到此处</div>,
  },
};

export const Ghost: Story = {
  args: {
    ghost: true,
    uploader: mockUploader,
    placeholder: (
      <div className="text-content-secondary text-center">Ghost 模式 - 拖拽图片到页面任意位置</div>
    ),
  },
};
