import React, { ReactNode } from 'react';
import { GlobalLoadingStateProvider } from '@/context/global_loading_state_provider';
import { GlobalRoutesContext, GlobalRoutesProvider } from '@/context/global_routes_provider';
import { EffectContextProvider } from '@/components/effect-layer/EffectContextProvider';

export const BBContext = (props: { children: ReactNode }) => {
  return (
    <GlobalLoadingStateProvider>
      <GlobalRoutesProvider>
        <EffectContextProvider>{props.children}</EffectContextProvider>
      </GlobalRoutesProvider>
    </GlobalLoadingStateProvider>
  );
};
