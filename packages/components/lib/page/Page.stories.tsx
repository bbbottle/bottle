import React from "react";

import { Page } from "./Page";
import { Nav } from "../nav/Nav";
import { HashRouter as Router } from "react-router-dom";
import { Link, LinkColor } from "../link/Link";

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
  title: "Page",
  component: Page,
};

export const Default = () => (
  <Router>
    <Page
      nav={<Nav paths={paths} />}
      main={
        <div className="p-8 border-dotted border border-gray-600 h-full">
          hello
        </div>
      }
      footer={
        <Link to="/world" color={LinkColor.GRAY}>
          hello
        </Link>
      }
    />
  </Router>
);
