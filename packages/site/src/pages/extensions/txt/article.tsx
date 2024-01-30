import React, { ReactElement, useContext } from "react";
import { MdxArticleList } from "@/articles";
import { withArticleWrapper } from "@/components";
import { MdxArticle } from "@/types/articles";
import { NotFound, Link } from "@bbki.ng/components";
import { useParams } from "react-router-dom";
import { usePosts } from "@/hooks/use_posts";
import { ArticlePage } from "@/components/article";
import { GlobalLoadingContext } from "@/global_loading_state_provider";

type TArticleMap = {
  [key: string]: ReactElement;
};

const ArticleMap: TArticleMap = {};

MdxArticleList.forEach((article: unknown) => {
  const { meta, default: component } = article as MdxArticle;
  const Article = withArticleWrapper(component);
  ArticleMap[meta.title] = <Article {...meta} />;
});

export default () => {
  const { title } = useParams();
  const { posts, isError, isLoading } = usePosts(title);
  const { setIsLoading } = useContext(GlobalLoadingContext);

  if (!title) {
    return <NotFound />;
  }

  if (ArticleMap[title]) {
    setIsLoading(false);
    return ArticleMap[title];
  }

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null;
  }

  return <ArticlePage title={title}>{posts.content}</ArticlePage>;
};
