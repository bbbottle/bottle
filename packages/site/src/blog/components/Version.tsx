import { Tag } from "@bbki.ng/components";
import React from "react";

export const Version = ({ className }: { className?: string }) => {
  // @ts-ignore
  const appVer = GLOBAL_BBKING_VERSION;
  const tagUrl = `https://github.com/bbbottle/bottle/releases/tag/@bbki.ng/site@${appVer}`;

  return (
    <Tag to={tagUrl} external prefix="v" className={className}>
      {appVer}
    </Tag>
  );
};
