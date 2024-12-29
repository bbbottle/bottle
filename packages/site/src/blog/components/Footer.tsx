import React, { useContext } from "react";
import { Link, Tag } from "@bbki.ng/components";
import { useLocation } from "react-router-dom";
import { usePaths } from "@/hooks";
import { GlobalLoadingContext } from "@/global_loading_state_provider";

export const Footer = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const { isLoading } = useContext(GlobalLoadingContext);

  if (isRoot) {
    // @ts-ignore
    const appVer = GLOBAL_BBKING_VERSION;
    const tagUrl = `https://github.com/bbbottle/bottle/releases/tag/@bbki.ng/site@${appVer}`;
    return (
      <div className="mt-128">
        <Tag to={tagUrl} prefix="v" external>
          {appVer}
        </Tag>
      </div>
    );
  }

  if (isLoading) {
    return null;
  }

  const paths = usePaths();
  const prevPath = paths[paths.length - 2];

  return (
    <div className="w-full flex justify-center md:hidden">
      <Link to={prevPath.path || ""} className="text-center">
        cd ..
      </Link>
    </div>
  );
};
