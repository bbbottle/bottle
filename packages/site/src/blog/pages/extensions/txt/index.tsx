import React from "react";
import { ArticleList } from "./consts";
import { LinkProps, DropZone } from "@bbki.ng/components";
import { usePosts } from "@/hooks/use_posts";
import { CenterLinkList } from "@/components";
import { useAuthed } from "@/hooks/use_authed";
import { useFile2Post } from "@/hooks/use_file_to_post";
import { DelayFadeIn } from "@/components/DelayFadeIn/DelayFadeIn";
import { useSafeArticleLoading } from "@/hooks/use_safe_loading";

type TxtProps = {
  title?: string;
  articleList?: LinkProps[];
};

const Posts = (props: TxtProps) => {
  const { titleList, isLoading, isError } = usePosts();

  const isGlobalLoading = useSafeArticleLoading(0.2, 5);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <CenterLinkList links={props.articleList || ArticleList} />;
  }

  const links = [...titleList, ...ArticleList];

  return (
    <CenterLinkList
      links={props.articleList || links}
      loading={isGlobalLoading}
    />
  );
};

export default (props: TxtProps) => {
  const reader = useFile2Post();
  const isKing = useAuthed();

  return (
    <DropZone onDrop={reader} disabled={!isKing}>
      <Posts {...props} />
    </DropZone>
  );
};
