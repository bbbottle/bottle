import React from "react";
import { Table, Link, Error } from "@bbki.ng/components";
import { useBooks } from "@/hooks";
import { TableSkeleton } from "@/components/table_skeleton";

const CELL_STYLE = {
  width: 100,
  maxWidth: 100,
};

export const BookList = () => {
  const { books, isLoading, isError } = useBooks();
  if (isError) {
    return <Error error={isError} />;
  }

  if (isLoading) {
    return <TableSkeleton headers={["书名", "状态"]} />;
  }

  const renderHeader = () => {
    return (
      <>
        <Table.HCell style={CELL_STYLE}>书名</Table.HCell>
        <Table.HCell style={CELL_STYLE}>状态</Table.HCell>
      </>
    );
  };

  const filteredBooks = books.filter((m: any) => m.visible == 1);

  const renderRow = (index: number) => {
    const { name: title, link, status } = filteredBooks[index];
    return (
      <>
        <Table.Cell style={CELL_STYLE}>
          <Link to={link} external>
            {title}
          </Link>
        </Table.Cell>
        <Table.Cell style={CELL_STYLE}>{status}</Table.Cell>
      </>
    );
  };
  return (
    <Table
      rowCount={filteredBooks.length}
      rowRenderer={renderRow}
      headerRenderer={renderHeader}
    />
  );
};
