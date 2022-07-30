import React from 'react';
import PostComponent from '@theme/BlogPostPage';

export default (props) => {
  return (
    <div className="prose">
      <PostComponent {...props} />
    </div>
  )
}
