import React from "react";
import { Table, Link, Error } from "@bbki.ng/components";
import { TableSkeleton } from "@/components/table_skeleton";
import { useMovies } from "@/hooks";

const CELL_STYLE = {
  width: 100,
  maxWidth: 100,
};

export const MovieList = () => {
  const { movies, isLoading, isError } = useMovies();

  if (isError) {
    return <Error error={isError} />;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  const filteredMovies = movies.filter((m: any) => m.visible == 1);

  const renderHeader = () => {
    return (
      <>
        <Table.HCell style={CELL_STYLE}>名字</Table.HCell>
        <Table.HCell style={CELL_STYLE}>状态</Table.HCell>
      </>
    );
  };

  const renderRow = (index: number) => {
    const { name, link, status } = filteredMovies[index];
    return (
      <>
        <Table.Cell style={CELL_STYLE}>
          <Link to={link} external>
            {name}
          </Link>
        </Table.Cell>
        <Table.Cell style={CELL_STYLE}>{status}</Table.Cell>
      </>
    );
  };
  return (
    <Table
      rowCount={filteredMovies.length}
      rowRenderer={renderRow}
      headerRenderer={renderHeader}
    />
  );
};
