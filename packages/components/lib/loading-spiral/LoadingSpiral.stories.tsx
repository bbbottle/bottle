import React from "react";
import { LoadingSpiral, LoadingSpiralProps } from "./LoadingSpiral";

export default {
  title: "LoadingSpiral",
  component: LoadingSpiral,
  argTypes: {
    color: {
      defaultValue: [209, 213, 219, 1],
    },
    length: {
      defaultValue: 0.3,
    },
  },
};

export const Default = (props: LoadingSpiralProps) => (
  <LoadingSpiral {...props} />
);
