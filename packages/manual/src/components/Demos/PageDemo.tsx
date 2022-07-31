import React from "react";

import { Page, Nav, Link, LinkColor } from "@bbki.ng/components";
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

export const PageDemo = () => (
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
