import React, { CSSProperties, StyleHTMLAttributes } from "react";
export type TableProps = {
  rowCount: number;
  rowRenderer: (index: number) => any;
  headerRenderer?: () => any;
  className?: string;
};
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

Table.HCell = (props: { children: any; style?: CSSProperties }) => (
  <th {...props}>{props.children}</th>
);
Table.Cell = (props: { children: any; style?: CSSProperties }) => (
  <td {...props}>{props.children}</td>
);
