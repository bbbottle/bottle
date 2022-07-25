import React from "react";
import { Button, ButtonProps, ButtonType } from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    type: {
      options: [
        ButtonType.PRIMARY,
        ButtonType.DISABLED,
        ButtonType.NORMAL,
        ButtonType.DANGER,
      ],
      defaultValue: ButtonType.PRIMARY,
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
  },
};

const onClick = console.log;

export const Default = (props: ButtonProps) => (
  <Button type={props.type || ButtonType.PRIMARY} onClick={onClick}>
    Button
  </Button>
);
