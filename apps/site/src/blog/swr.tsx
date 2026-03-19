import React from 'react';
import { SWRConfig } from 'swr';
import { cfApiFetcher } from '@/utils';

export const SWR = (props: { children: any }) => {
  return (
    <SWRConfig
      value={{
        fetcher: cfApiFetcher,
      }}
    >
      {props.children}
    </SWRConfig>
  );
};
