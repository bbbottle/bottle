import React from "react";
import { Tags } from "./Tag";
import { HashRouter as Router } from "react-router-dom";

export default {
  title: "Tags",
  component: Tags,
};

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

export const Default = () => (
  <Router>
    <Tags tags={paths} />
  </Router>
);
