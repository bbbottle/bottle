import React from "react";
import { LinkList } from "@bbki.ng/components";

export const Cover = (props: { className: string }) => {
  return (
    <LinkList
      links={[
        {
          to: "/projects",
          name: "cd ./projects",
        },
        {
          to: "/blog",
          name: "ls *.md",
        },
      ]}
      title=" "
    />
  );
};
