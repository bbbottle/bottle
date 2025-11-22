import React from "react";
import { DropImage } from "./DropImage";

export default {
  title: "DropImage",
  component: DropImage,
};

export const Default = () => {
  return (
    <DropImage
      placeholder={<span className="text-gray-400">drop image here</span>}
      uploader={async () => {
        return false;
      }}
    />
  );
};

export const Ghost = () => {
  return (
    <DropImage
      placeholder={<span className="text-gray-400">drop image here</span>}
      uploader={async () => {
        return false;
      }}
      ghost
    />
  );
};
