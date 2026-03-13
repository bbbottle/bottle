import React from 'react';
import { SWRConfig } from 'swr';
import { apiFetcher } from '@/utils';

export const SWR = (props: { children: any }) => {
  return (
    <SWRConfig
      value={{
        fetcher: apiFetcher,
      }}
    >
      {props.children}
    </SWRConfig>
  );
};
