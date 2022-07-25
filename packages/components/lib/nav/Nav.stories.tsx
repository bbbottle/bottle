import React from "react";
import { Nav } from "./Nav";
import { HashRouter as Router } from "react-router-dom";
const paths = [
  {
    name: "~",
    path: "/",
  },
  {
    name: "ext",
    path: "/ext",
  },
  {
    name: "txt",
  },
];

export default {
  title: "Nav",
  component: Nav,
};

export const Default = () => (
  <Router>
    <Nav paths={paths} />
  </Router>
);

export const Loading = () => (
  <Router>
    <Nav paths={paths} loading />
  </Router>
);
