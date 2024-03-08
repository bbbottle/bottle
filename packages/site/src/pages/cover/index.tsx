import React from "react";
import { CenterLinkList } from "@/components";
import { ContextMenuDemo } from "@/demo/DemoMenu";

export const Cover = (props: { className: string }) => {
  return (
    <CenterLinkList
      links={[
        {
          to: "/projects",
          name: "cd ./projects",
        },
        {
          to: "/blog",
          name: "cd ./blog",
        },
        {
          to: "/now",
          name: "cd ./now",
        },
      ]}
      title=""
    />
  );
};
