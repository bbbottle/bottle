import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { name: 'Item 1', value: 100, status: 'Active' },
  { name: 'Item 2', value: 200, status: 'Inactive' },
  { name: 'Item 3', value: 300, status: 'Active' },
];

export const Default: Story = {
  args: {
    rowCount: sampleData.length,
    headerRenderer: () => (
      <>
        <Table.HCell className="text-left p-2 text-content-primary">Name</Table.HCell>
        <Table.HCell className="text-left p-2 text-content-primary">Value</Table.HCell>
        <Table.HCell className="text-left p-2 text-content-primary">Status</Table.HCell>
      </>
    ),
    rowRenderer: (index: number) => (
      <>
        <Table.Cell className="p-2 text-content-primary">{sampleData[index].name}</Table.Cell>
        <Table.Cell className="p-2 text-content-secondary">{sampleData[index].value}</Table.Cell>
        <Table.Cell className="p-2 text-content-secondary">{sampleData[index].status}</Table.Cell>
      </>
    ),
    className: 'w-full border-collapse',
  },
};

export const WithoutHeader: Story = {
  args: {
    rowCount: sampleData.length,
    rowRenderer: (index: number) => (
      <>
        <Table.Cell className="p-2 text-content-primary">{sampleData[index].name}</Table.Cell>
        <Table.Cell className="p-2 text-content-secondary">{sampleData[index].value}</Table.Cell>
      </>
    ),
    className: 'w-full',
  },
};
