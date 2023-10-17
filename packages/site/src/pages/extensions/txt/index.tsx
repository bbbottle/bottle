import React from "react";
import { ArticleList } from "./consts";
import { LinkList, LinkProps } from "@bbki.ng/components";
import { useRouteName } from "@/hooks";
import { usePosts } from "@/hooks/use_posts";

type TxtProps = {
  title?: string;
  articleList?: LinkProps[];
};

export default (props: TxtProps) => {
  const name = useRouteName();
  const { titleList, isLoading, isError } = usePosts();

  const links =
    isError || isLoading ? ArticleList : [...ArticleList, ...titleList];

  return (
    <LinkList links={props.articleList || links} title={props.title || name} />
  );
};
