import React, { useContext } from "react";
import { Link } from "@bbki.ng/components";
import { useLocation } from "react-router-dom";
import { usePaths } from "@/hooks";
import { GlobalLoadingContext } from "@/global_loading_state_provider";

export const Footer = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const { isLoading } = useContext(GlobalLoadingContext);

  if (isRoot || isLoading) {
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
