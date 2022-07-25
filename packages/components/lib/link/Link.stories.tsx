import React from "react";

import { Link, LinkColor, LinkProps } from "./Link";
import { HashRouter as Router } from "react-router-dom";

export default {
  title: "Link",
  component: Link,
  argTypes: {
    color: {
      options: [LinkColor.BLUE, LinkColor.RED, LinkColor.GRAY],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
      defaultValue: LinkColor.BLUE,
    },
    external: {
      type: "boolean",
      defaultValue: false,
      control: { type: "boolean" },
    },
    to: {
      defaultValue: "/foo/bar",
    },
  },
};

export const Default = (props: LinkProps) => (
  <Router>
    <Link
      to={props.external ? "https://bbki.ng" : "/foo/bar"}
      external={props.external}
      color={props.color}
    >
      Foo
    </Link>
  </Router>
);
