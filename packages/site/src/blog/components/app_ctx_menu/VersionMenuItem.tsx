import { ContextMenuItem, Tag } from "@bbki.ng/components";
import React from "react";

export const VersionMenuItem = () => {
  // @ts-ignore
  const appVer = GLOBAL_BBKING_VERSION;

  return (
    <ContextMenuItem inset disabled>
      v{appVer}
    </ContextMenuItem>
  );
};
