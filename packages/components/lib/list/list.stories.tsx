import { HashRouter as Router } from "react-router-dom";
import React from "react";
import { List, LinkList } from "./list";
import { Link } from "../link/Link";

export default {
  title: "List",
  component: List,
};

export const Default = () => {
  return <List items={["foo", "bar", "baz"]} itemRenderer={(n) => n} />;
};

export const HorizontalList = () => {
  return (
    <List items={["foo", "bar", "baz"]} itemRenderer={(n) => n} horizontal />
  );
};

export const ListOfLink = () => {
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
    <Router>
      <LinkList links={ExtensionsList} />
    </Router>
  );
};

export const ListOfLinkWithTitle = () => {
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
    <Router>
      <LinkList links={ExtensionsList} title="hello world" />
    </Router>
  );
};
