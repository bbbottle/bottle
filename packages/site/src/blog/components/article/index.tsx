import React, { ReactElement, useContext, useEffect } from "react";
import { Tags, Article } from "@bbki.ng/components";
import { ROUTES } from "@/constants";
import classNames from "classnames";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";

export type ArticlePageProps = {
  tags?: string[];
  title: string;
  description?: any;
  headless?: boolean;
  className?: string;
  children: ReactElement;
};

const useSafeArticleLoading = (safeSec: number) => {
  const { isLoading, isFontLoading } = useContext(GlobalLoadingContext);
  const [isArticleLoading, setIsArticleLoading] = React.useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsArticleLoading(false);
    }, safeSec * 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return isLoading || isFontLoading || isArticleLoading;
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { tags: tagNames, title, description, headless } = props;
  const loading = useSafeArticleLoading(0.2);
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
    <>
      <Article
        title={title}
        description={description}
        className={props.className}
        loading={loading}
      >
        <article className={articleCls}>{props.children}</article>
      </Article>
      <span className="p-16">{tagNames && <Tags tags={tags} />}</span>
    </>
  );
};
