import { HashRouter as Router } from "react-router-dom";
import React from "react";
import { List, LinkList } from "@bbki.ng/components";
import {Demo} from "@site/src/components/Demo";

export const BasicListDemo = () => {
  return (
    <>
      <Demo style={{ borderBottom: 'none' }}>
        <List items={["foo", "bar", "baz"]} itemRenderer={(n) => n} />
      </Demo>
      <Demo>
        <List items={["foo", "bar", "baz"]} itemRenderer={(n) => n} horizontal />
      </Demo>
    </>
  );
};

export const ListOfLinkDemo = () => {
  const ExtensionsList = [
    {
      to: "txt",
      name: "txt",
    },
    {
      to: "png",
      name: "png",
    },
    {
      to: "avi",
      name: "avi",
    },
  ];

  return (
    <Demo>
      <Router>
        <LinkList links={ExtensionsList} />
      </Router>
    </Demo>
  );
};

export const ListOfLinkWithTitleDemo = () => {
  const ExtensionsList = [
    {
      to: "txt",
      name: "txt",
    },
    {
      to: "png",
      name: "png",
    },
    {
      to: "avi",
      name: "avi",
    },
  ];

  return (
    <Demo>
      <Router>
        <LinkList links={ExtensionsList} title="hello world" />
      </Router>
    </Demo>
  );
};
