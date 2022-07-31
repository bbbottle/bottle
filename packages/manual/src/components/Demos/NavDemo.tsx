import React from "react";
import { Nav } from "@bbki.ng/components";
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


export const NavDemo = () => (
  <Router>
    <Nav paths={paths} />
  </Router>
);

export const LoadingNavDemo = () => (
  <Router>
    <Nav paths={paths} loading />
  </Router>
);
