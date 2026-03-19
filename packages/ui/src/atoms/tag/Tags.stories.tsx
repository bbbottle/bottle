import type { Meta, StoryObj } from '@storybook/react';
import { Tags } from './Tag';

const meta: Meta<typeof Tags> = {
  title: 'Atoms/Tags',
  component: Tags,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: [
      { to: '/tag/react', children: 'react' },
      { to: '/tag/typescript', children: 'typescript' },
      { to: '/tag/ui', children: 'ui' },
      { to: '/tag/design', children: 'design' },
    ],
  },
};

export const ExternalLinks: Story = {
  args: {
    tags: [
      { to: 'https://react.dev', children: 'react', external: true },
      { to: 'https://typescriptlang.org', children: 'typescript', external: true },
    ],
  },
};
