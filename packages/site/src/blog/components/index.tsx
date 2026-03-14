import React from 'react';
import { LinkList } from '@bbki.ng/components';
import { BlurCover } from '@bbki.ng/components';

export { withArticleWrapper } from './with_wrapper';

export { MySuspense } from './my_suspense';

export const CenterLinkList = (props: any) => {
  return (
    <div className="flex justify-center relative p-16 h-full">
      <LinkList {...props} />
      <BlurCover status={props.loading ? 'show' : 'silent'} />
    </div>
  );
};
