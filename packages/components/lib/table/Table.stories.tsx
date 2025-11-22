import React from "react";
import { Table } from "./Table";

export default {
  title: "Table",
  component: Table,
};

export const Default = () => {
  return (
    <div className="prose">
      <Table
        className="text-left"
        rowCount={3}
        rowRenderer={(i) => {
          return (
            <>
              <Table.Cell>{i}</Table.Cell>
              <Table.Cell>hello</Table.Cell>
              <Table.Cell>world</Table.Cell>
            </>
          );
        }}
        headerRenderer={() => {
          return (
            <>
              <Table.HCell>foo</Table.HCell>
              <Table.HCell>bar</Table.HCell>
              <Table.HCell>baz</Table.HCell>
            </>
          );
        }}
      />
    </div>
  );
};
