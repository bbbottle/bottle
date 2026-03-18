import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    centered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="h-32 bg-[var(--semantic-color-muted)] rounded flex items-center justify-center">
        Container Content
      </div>
    ),
    maxWidth: 'lg',
    padding: 'md',
  },
};

export const MaxWidths: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Container
          key={size}
          maxWidth={size}
          className="border border-dashed border-[var(--semantic-color-border)]"
        >
          <div className="h-16 bg-[var(--semantic-color-muted)] rounded flex items-center px-4 text-[var(--semantic-color-foreground)]">
            maxWidth: {size}
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const PaddingVariations: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      {(['none', 'sm', 'md', 'lg'] as const).map(pad => (
        <Container
          key={pad}
          maxWidth="lg"
          padding={pad}
          className="border border-dashed border-[var(--semantic-color-border)]"
        >
          <div className="h-16 bg-[var(--semantic-color-muted)] rounded flex items-center px-4 text-[var(--semantic-color-foreground)]">
            padding: {pad}
          </div>
        </Container>
      ))}
    </div>
  ),
};
