import React, { ReactElement } from 'react';
import { Article, Link } from '@bbki.ng/ui';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

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

  if (headless) {
    return props.children;
  }

  const articleCls = classNames('prose', 'mb-16');

  return (
    <>
      <Article
        title={title}
        date={props.date}
        description={description}
        className={`${props.className || ''}`}
        loading={false}
      >
        <article className={articleCls}>{props.children}</article>
        {/*<div className="relative -left-8">
          <Reaction title={title} url={window.location.href} />
        </div>*/}
      </Article>
      <div className="flex flex-col gap-4" style={{ position: 'relative', left: -4 }}>
        <Link className="w-fit" to="/blog">
          cd ..
        </Link>
        <Link className="w-fit" to="/">
          cd ~
        </Link>
      </div>
    </>
  );
};
