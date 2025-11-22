import React from "react";
import { Article } from "./Article";
import { Tag } from "../tag/Tag";
import { HashRouter as Router } from "react-router-dom";

export default {
  title: "Article",
  component: Article,
};

export const Default = () => (
  <Article title="Foobar" className="max-w-md">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac metus
    accumsan, vehicula purus vitae, blandit enim. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Vestibulum ac metus accumsan, vehicula purus
    vitae, blandit enim. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit. Vestibulum ac metus accumsan, ve
  </Article>
);

export const ArticleWithDescription = () => (
  <Router>
    <Article
      title="Foobar"
      className="max-w-md"
      description={<Tag to="world">hello</Tag>}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
      metus accumsan, vehicula purus vitae, blandit enim. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Vestibulum ac metus accumsan, vehicula
      purus vitae, blandit enim. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Vestibulum ac metus accumsan, ve
    </Article>
  </Router>
);
