import React, { ReactElement, useContext, useEffect } from "react";
import { Tags, Article } from "@bbki.ng/components";
import { ROUTES } from "@/constants";
import classNames from "classnames";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { useSafeArticleLoading } from "@/hooks/use_safe_loading";
import { OpenHeartReaction, Reaction } from "../reaction/oh_reaction";

export type ArticlePageProps = {
  tags?: string[];
  title: string;
  description?: any;
  headless?: boolean;
  className?: string;
  children: ReactElement;
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { tags: tagNames, title, description, headless } = props;
  const loading = useSafeArticleLoading(0.2, 5);
  const defaultTag = { children: "目录", to: "/blog" };
  const tags = tagNames
    ? tagNames.map((t) => ({ children: t, to: `${ROUTES.TAGS}/${t}` }))
    : [];

  const allTags = [defaultTag, ...tags];

  if (headless) {
    return props.children;
  }

  const articleCls = classNames("prose");

  return (
    <>
      <Article
        title={title}
        description={description}
        className={`${props.className} mb-128`}
        loading={loading}
      >
        <article className={articleCls}>{props.children}</article>
        <div className="mt-[1.25em] relative left-[-4px]">
          {<Tags tags={allTags} />}
        </div>
      </Article>
      <div className="px-16">
        <Reaction title={title} />
      </div>
    </>
  );
};
