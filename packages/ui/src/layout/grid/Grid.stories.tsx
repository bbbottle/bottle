import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 6, 12],
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="h-24 bg-[var(--semantic-color-muted)] rounded flex items-center justify-center text-[var(--semantic-color-foreground)]">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </>
    ),
    cols: 3,
    gap: 'md',
  },
};

export const ColumnVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {[2, 3, 4, 6].map(colCount => (
        <div key={colCount}>
          <p className="text-sm text-[var(--semantic-color-muted-foreground)] mb-2">
            {colCount} columns
          </p>
          <Grid cols={colCount as 2 | 3 | 4 | 6} gap="md">
            {Array.from({ length: colCount }).map((_, i) => (
              <Box key={i}>{i + 1}</Box>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const GapVariations: Story = {
  render: () => (
    <div className="space-y-8">
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map(gapSize => (
        <div key={gapSize}>
          <p className="text-sm text-[var(--semantic-color-muted-foreground)] mb-2">
            gap: {gapSize}
          </p>
          <Grid cols={3} gap={gapSize}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const ThreeColumnLayout: Story = {
  render: () => (
    <div className="h-96 border border-[var(--semantic-color-border)] rounded">
      <Grid
        gap="md"
        leftAside={
          <div className="h-full bg-[var(--semantic-color-muted)] rounded p-4 text-[var(--semantic-color-foreground)]">
            Left Sidebar
          </div>
        }
        rightAside={
          <div className="h-full bg-[var(--semantic-color-muted)] rounded p-4 text-[var(--semantic-color-foreground)]">
            Right Sidebar
          </div>
        }
      >
        <div className="h-full bg-[var(--semantic-color-primary)]/10 rounded p-4 text-[var(--semantic-color-foreground)]">
          Main Content Area
        </div>
      </Grid>
    </div>
  ),
};
