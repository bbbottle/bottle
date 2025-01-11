import React, { ReactElement, useContext, useEffect } from "react";
import { MdxArticleList } from "@/articles";
import { withArticleWrapper } from "@/components";
import { MdxArticle } from "@/types/articles";
import { NotFound, DropZone } from "@bbki.ng/components";
import { useParams } from "react-router-dom";
import { usePosts } from "@/hooks/use_posts";
import { ArticlePage } from "@/components/article";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { useFile2Post } from "@/hooks/use_file_to_post";
import { useAuthed } from "@/hooks/use_authed";
import { ArticleCtxMenu } from "@/components/article_ctx_menu";

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

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  const reader = useFile2Post();
  const isKing = useAuthed();

  if (!title) {
    return <NotFound />;
  }

  if (ArticleMap[title]) {
    return ArticleMap[title];
  }

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <DropZone onDrop={reader} disabled={!isKing}>
      <ArticlePage title={title}>
        <ArticleCtxMenu>
          <div dangerouslySetInnerHTML={{ __html: posts.content }} />
        </ArticleCtxMenu>
      </ArticlePage>
    </DropZone>
  );
};
