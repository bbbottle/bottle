import * as React from 'react';
import { Logo } from '@bbki.ng/components';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Logo',
  component: Logo,
};

export const Default = () => <Logo />;
