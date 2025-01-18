import { ContextMenuItem, ContextMenuShortcut } from "@bbki.ng/components";
import React from "react";
import { GITHUB_REPO_ADDRESS } from "@/constants";

export const ViewSourceMenuItem = () => {
  // @ts-ignore
  const appVer = GLOBAL_BBKING_VERSION;
  return (
    <ContextMenuItem
      onClick={() => {
        // open tagUrl in new tab
        window.open(GITHUB_REPO_ADDRESS, "_blank");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-code mr-8"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      v{appVer}
      <ContextMenuShortcut className="mr-1">s</ContextMenuShortcut>
    </ContextMenuItem>
  );
};
