import React from "react";
import { Watch } from "@/components/Pochacco/watch";
import { Idle } from "@/components/Pochacco/idle";

export enum PochaccoPose {
  Idle = "idle",
  Watching = "watching",
}

export type PochaccoProps = {
  size?: number;
  pose?: PochaccoPose;
};

export const Pochacco = (props: PochaccoProps) => {
  const { size = 48, pose = PochaccoPose.Idle } = props;

  if (pose === PochaccoPose.Watching) {
    return <Watch {...props} />;
  }

  return <Idle {...props} />;
};
