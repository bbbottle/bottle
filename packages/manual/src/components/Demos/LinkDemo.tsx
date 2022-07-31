import React from "react";

import { Link, LinkColor, LinkProps } from "@bbki.ng/components";
import { HashRouter as Router } from "react-router-dom";
import {Demo} from "@site/src/components/Demo";

export const LinkDemo = (props: LinkProps) => (
  <Demo>
    <div className="inline-flex">
      <Router>
        <Link
          className="mr-8"
          to="/foo/bar"
          color={LinkColor.BLUE}
        >
          Foo
        </Link>
        <Link
          className="mr-8"
          to="/foo/bar"
          color={LinkColor.RED}
        >
          Bar
        </Link>
        <Link
          className="mr-8"
          to="/foo/bar"
          color={LinkColor.GRAY}
        >
          Baz
        </Link>
      </Router>
    </div>
  </Demo>
);
