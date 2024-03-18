import React, { ReactElement } from "react";
import { Tags, Article } from "@bbki.ng/components";
import { ROUTES } from "@/constants";
import { DelayFadeIn } from "@/components/DelayFadeIn/DelayFadeIn";
import classNames from "classnames";

type ArticlePageProps = {
  tags?: string[];
  title: string;
  description?: any;
  headless?: boolean;
  className?: string;
  children: ReactElement;
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { tags: tagNames, title, description, headless } = props;
  const tags = tagNames
    ? tagNames.map((t) => ({ children: t, to: `${ROUTES.TAGS}/${t}` }))
    : [];

  if (headless) {
    return props.children;
  }

  const articleCls = classNames("prose", {
    "mb-20": tagNames,
  });

  return (
    <DelayFadeIn delay={200}>
      <Article
        title={title}
        description={description}
        className={props.className}
      >
        <article className={articleCls}>{props.children}</article>
      </Article>
      {tagNames && <Tags tags={tags} />}
    </DelayFadeIn>
  );
};
