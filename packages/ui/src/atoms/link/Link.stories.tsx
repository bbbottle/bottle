import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'danger', 'muted'],
      description: '链接样式变体',
    },
    external: {
      control: 'boolean',
      description: '是否为外部链接',
    },
    readonly: {
      control: 'boolean',
      description: '只读模式',
    },
    status: {
      control: 'select',
      options: ['blink', 'still', 'hidden'],
      description: 'BlinkDot 状态指示器',
    },
    to: {
      control: 'text',
      description: '链接地址',
    },
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
    children: 'Default Link',
    to: '/foo/bar',
    variant: 'default',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-6">
      <Link to="/" variant="default">
        Default (Action)
      </Link>
      <Link to="/" variant="danger">
        Danger
      </Link>
      <Link to="/" variant="muted">
        Muted
      </Link>
      <Link to="/" variant="special">
        Special
      </Link>
    </div>
  ),
};

export const External: Story = {
  args: {
    children: 'External Link',
    to: 'https://bbki.ng',
    external: true,
    variant: 'default',
  },
};

export const Readonly: Story = {
  args: {
    children: 'Read Only Text',
    to: '/',
    readonly: true,
  },
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-6">
      <Link to="/" status="blink">
        Blinking Status
      </Link>
      <Link to="/" status="still">
        Still Status
      </Link>
      <Link to="/" status="hidden">
        Hidden Status
      </Link>
    </div>
  ),
};

export const SpecialContent: Story = {
  args: {
    children: '小乌鸦',
    to: '/',
    variant: 'special',
  },
  parameters: {
    docs: {
      description: {
        story: '当链接内容包含 "小乌鸦" 时，自动使用 danger 样式',
      },
    },
  },
};
