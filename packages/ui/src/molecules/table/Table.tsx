import { TableProps, TableHCellProps, TableCellProps } from './Table.types';

export const Table = (props: TableProps) => {
  const { rowCount, rowRenderer, headerRenderer, className } = props;
  const rows = [];

  for (let i = 0; i < rowCount; i++) {
    rows.push(<tr key={i}>{rowRenderer(i)}</tr>);
  }

  return (
    <table className={className}>
      {headerRenderer && (
        <thead>
          <tr>{headerRenderer()}</tr>
        </thead>
      )}
      <tbody>{rows}</tbody>
    </table>
  );
};

Table.displayName = 'Table';

const HCell = (props: TableHCellProps) => <th {...props}>{props.children}</th>;
HCell.displayName = 'Table.HCell';
Table.HCell = HCell;

const Cell = (props: TableCellProps) => <td {...props}>{props.children}</td>;
Cell.displayName = 'Table.Cell';
Table.Cell = Cell;
