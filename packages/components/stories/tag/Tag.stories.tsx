import React from 'react';
import { Tag } from '@bbki.ng/components';
import { HashRouter as Router } from 'react-router-dom';

export default {
  title: 'Tag',
  component: Tag,
};

export const Default = () => (
  <Router>
    <Tag to="/foo/bar">foo</Tag>
  </Router>
);
