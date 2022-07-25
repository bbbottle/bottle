import React from "react";
import { ThreeColLayout } from "./layout";

export default {
  title: "Layout",
  component: ThreeColLayout,
};

export const ThreeCol = () => {
  const renderDiv = (txt: string) => {
    return (
      <div className="px-8 h-full border border-dotted border-gray-600">
        {txt}
      </div>
    );
  };

  return (
    <ThreeColLayout
      leftRenderer={() => renderDiv("foo")}
      middleRenderer={() => renderDiv("bar")}
      rightRenderer={() => renderDiv("baz")}
    />
  );
};
