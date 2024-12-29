import React from "react";
import { CenterLinkList } from "@/components";
import {EffectLayer} from "@/components/effect-layer/EffectLayer";

export const Cover = (props: { className: string }) => {
  return (
    <>
      <CenterLinkList
        className="select-none"
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
    </>
  );
};
