import React from "react";
import { ThreeColLayout } from "@bbki.ng/components";

export const LayoutDemo = () => {
  const renderDiv = (txt: string) => {
    return (
      <div className="p-16 h-full border border-dotted border-gray-600">
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
