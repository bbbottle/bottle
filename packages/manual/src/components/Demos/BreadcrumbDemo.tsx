import React from 'react';
import {Demo} from "@site/src/components/Demo";
import {HashRouter as Router} from "react-router-dom";
import {Breadcrumb} from "@bbki.ng/components";

export const BreadcrumbDemo = () => {
  const paths = [
    {
      name: "~",
      path: "/",
    },
    {
      name: "ext",
      path: "/projects",
    },
    {
      name: "望月湖独行散记",
    },
  ];

  return (
    <Demo>
      <Router>
        <Breadcrumb paths={paths} />
      </Router>
    </Demo>
  )
}
