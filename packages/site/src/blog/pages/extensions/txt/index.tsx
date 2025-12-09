import React from "react";
import { ArticleList } from "./consts";
import { LinkProps, DropZone, Button } from "@bbki.ng/components";
import { usePosts } from "@/hooks/use_posts";
import { CenterLinkList } from "@/components";
import { useAuthed } from "@/hooks/use_authed";
import { useFile2Post } from "@/hooks/use_file_to_post";
import { useClipboardToPost } from "@/hooks/use_clipboard_to_post";
import { useLocation } from "react-router-dom";
import {
  useBlogScroll,
  useBlogScrollRestoration,
} from "@/hooks/use_blog_scroll_pos_restoration";

type TxtProps = {
  title?: string;
  articleList?: LinkProps[];
};

const Posts = (props: TxtProps) => {
  const { titleList, isLoading, isError } = usePosts();

  useBlogScrollRestoration();

  const { gotoTop } = useBlogScroll();

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
      loading={isLoading}
      footer={
        <Button onClick={gotoTop} className="mt-128">
          <svg
            data-testid="geist-icon"
            height="16"
            stroke-linejoin="round"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
      }
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
