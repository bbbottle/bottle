import React from "react";
import { ArticleList } from "./consts";
import { LinkList, LinkProps } from "@bbki.ng/components";
import { useRouteName } from "@/hooks";
import { usePosts } from "@/hooks/use_posts";
import { CenterLinkList, MySuspense } from "@/components";

type TxtProps = {
  title?: string;
  articleList?: LinkProps[];
};

const Posts = (props: TxtProps) => {
  const name = useRouteName();
  const { titleList, isLoading, isError } = usePosts();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <CenterLinkList links={props.articleList || ArticleList} title=" " />
    );
  }

  const links = [...ArticleList, ...titleList];

  return <CenterLinkList links={props.articleList || links} title=" " />;
};

export default (props: TxtProps) => {
  return (
    // <MySuspense>
    <Posts {...props} />
    // </MySuspense>
  );
};
