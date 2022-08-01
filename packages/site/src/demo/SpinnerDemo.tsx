import React from "react";
import { DemoBox } from "@/demo/DemoBox.js";
import { Spinner } from "@/components/Spinner";

export const SpinnerDemo = () => {
  return (
    <DemoBox style={{ background: "#dc5530", borderColor: "white" }}>
      <Spinner
        disableDotIndicator
      />
    </DemoBox>
  );
};
