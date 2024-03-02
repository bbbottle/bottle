import React from "react";
import { CenterLinkList } from "@/components";
import { Footer } from "@/components/Footer";

export const Cover = (props: { className: string }) => {
  // @ts-ignore
  const appVer = GLOBAL_BBKING_VERSION;
  const tagUrl = `https://github.com/bbbottle/bottle/releases/tag/@bbki.ng/site@${appVer}`;

  return (
    <div className="w-fit m-auto">
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
        title=" "
      />
      <Footer />
    </div>
  );
};
