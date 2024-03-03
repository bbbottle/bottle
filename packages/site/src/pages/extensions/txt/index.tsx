import React from "react";
import { ArticleList } from "./consts";
import { LinkProps, DropZone } from "@bbki.ng/components";
import { usePosts } from "@/hooks/use_posts";
import { CenterLinkList } from "@/components";
import { useAuthed } from "@/hooks/use_authed";
import { useFile2Post } from "@/hooks/use_file_to_post";

type TxtProps = {
  title?: string;
  articleList?: LinkProps[];
};

const Posts = (props: TxtProps) => {
  const { titleList, isLoading, isError } = usePosts();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <CenterLinkList links={props.articleList || ArticleList} title=" " />
    );
  }

  const links = [...titleList, ...ArticleList];

  return <CenterLinkList links={props.articleList || links} title=" " />;
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
