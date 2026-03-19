import type { Meta, StoryObj } from '@storybook/react';
import { Page, NotFound, Error as PageError, ErrorBoundary } from './Page';
import { MemoryRouter } from 'react-router-dom';
import { Nav } from '../../molecules/nav';

const meta: Meta<typeof Page> = {
  title: 'Organisms/Page',
  component: Page,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
  render: () => (
    <Page
      nav={<Nav paths={[{ path: '/', name: '~' }]} />}
      main={<div>Main content placeholder</div>}
    />
  ),
};

export const NotFoundDefault: Story = {
  render: () => <NotFound />,
};

export const NotFoundWithMessage: Story = {
  render: () => <NotFound>Custom page not found message</NotFound>,
};

export const ErrorDefault: Story = {
  render: () => <PageError error={new Error('Something went wrong')} />,
};

// Helper component to trigger ErrorBoundary
const ThrowError = () => {
  throw new Error('Render error!');
};

export const ErrorBoundaryDefault: Story = {
  render: () => (
    <ErrorBoundary>
      <div>Normal child content</div>
    </ErrorBoundary>
  ),
};

export const ErrorBoundaryWithError: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  ),
};
