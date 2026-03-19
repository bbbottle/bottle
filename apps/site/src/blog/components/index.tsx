import React from 'react';
import { LinkList } from '@bbki.ng/ui';

export { MySuspense } from './my_suspense';

export const CenterLinkList = (props: any) => {
  return (
    <div className="flex justify-center relative h-full">
      <LinkList {...props} />
    </div>
  );
};
