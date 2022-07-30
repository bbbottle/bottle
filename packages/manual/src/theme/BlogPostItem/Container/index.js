import React from 'react';
import Container from '@theme-original/BlogPostItem/Container';

export default function ContainerWrapper(props) {
  return (
    <div className="prose">
      <Container {...props} />
    </div>
  );
}
