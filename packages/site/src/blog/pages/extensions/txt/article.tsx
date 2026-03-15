import React from 'react';
import { NotFound } from '@bbki.ng/components';
import { useParams } from 'react-router-dom';
import { usePosts } from '@/hooks/use_posts';
import { ArticlePage } from '@/components/article';
import { useBlogScrollReset } from '@/hooks/use_blog_scroll_pos_restoration';

export default () => {
  const { title } = useParams();
  const { posts, isError, isLoading } = usePosts(title);

  useBlogScrollReset();

  if (!title) {
    return <NotFound />;
  }

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null;
  }

  const date = posts.createdAt ? posts.createdAt.split('T')[0] : '';

  return (
    <ArticlePage title={title} date={date}>
      <div dangerouslySetInnerHTML={{ __html: posts.content }} />
    </ArticlePage>
  );
};
