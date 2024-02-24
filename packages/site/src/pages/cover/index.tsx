import React from "react";
import { LinkList } from "@bbki.ng/components";
import { CenterLinkList } from "@/components";

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
      ]}
      title=" "
    />
  );
};
