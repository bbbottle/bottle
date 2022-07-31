import React from "react";
import { Tags } from "@bbki.ng/components";
import { HashRouter as Router } from "react-router-dom";

const paths = [
  {
    to: "foo",
    children: "foo",
  },
  {
    to: "bar",
    children: "bar",
  },
  {
    to: "baz",
    children: "baz",
  },
];

export const TagsDemo = () => (
  <Router>
    <Tags tags={paths} />
  </Router>
);
