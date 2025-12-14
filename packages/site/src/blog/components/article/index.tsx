import React, { ReactElement } from "react";
import { Tags, Article, Button } from "@bbki.ng/components";
import { ROUTES } from "@/constants";
import classNames from "classnames";
import { Reaction } from "../reaction/oh_reaction";
import { useNavigate } from "react-router-dom";
import { ShareBtn } from "../share/share-btn";

export type ArticlePageProps = {
  tags?: string[];
  title: string;
  date?: string;
  description?: any;
  headless?: boolean;
  className?: string;
  children: ReactElement;
};

export const ArticlePage = (props: ArticlePageProps) => {
  const { tags: tagNames, title, description, headless } = props;
  const navgation = useNavigate();
  // const defaultTag = { children: "目录", to: "/blog" };
  const allTags = tagNames
    ? tagNames.map((t) => ({ children: t, to: `${ROUTES.TAGS}/${t}` }))
    : [];

  // const allTags = [defaultTag, ...tags];

  if (headless) {
    return props.children;
  }

  const articleCls = classNames("prose", "mb-32");

  return (
    <>
      <Article
        title={title}
        date={props.date}
        description={description}
        className={`${props.className} mb-128`}
        loading={false}
      >
        <article className={articleCls}>{props.children}</article>
        <div className="relative left-[-4px]">
          {allTags.length ? <Tags tags={allTags} className="mb-32" /> : null}
          <Reaction title={title} url={window.location.href} />
        </div>
      </Article>
      <div className="">
        <Button
          className=""
          btnType="button"
          onClick={() => {
            navgation(-1);
          }}
        >
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
              d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
      </div>
    </>
  );
};
