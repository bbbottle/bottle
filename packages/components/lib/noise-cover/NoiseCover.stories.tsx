import React from "react";
import { NoiseCover } from "./NoiseCover";

export default {
  title: "NoiseCover",
  component: NoiseCover,
};

export const Default = () => {
  return <NoiseCover />;
};

export const ColorfulNoise = () => {
  return (
    <NoiseCover
      color="#2563eb"
      className="flex justify-center items-center text-white"
    >
      404
    </NoiseCover>
  );
};
