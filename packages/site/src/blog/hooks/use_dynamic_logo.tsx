import React from "react";
import { Role, useRole } from "./use_role";
import { Pochacco, PochaccoPose } from "@/components/Pochacco/Pochacco";
import { useLocation } from "react-router-dom";

export const useDynamicLogo = () => {
  const role = useRole();
  const isQueen = role === Role.QUEEN;
  const location = useLocation();

  if (decodeURIComponent(location.pathname).includes("小乌鸦")) {
    return <Pochacco pose={PochaccoPose.Crows} />;
  }

  if (isQueen) {
    return <Pochacco pose={PochaccoPose.Watching} />;
  }

  return null;
};
