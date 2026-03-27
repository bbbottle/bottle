import { type PathObj } from '@bbki.ng/ui';
import React from 'react';

export const Emoji = ({ data }: { data: any }) => {
  const path = data as PathObj[];
  console.log(path);
  return <span>😊</span>;
};
