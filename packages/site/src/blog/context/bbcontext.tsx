import React, { ReactNode } from "react";
import { GlobalLoadingStateProvider } from "@/context/global_loading_state_provider";
import {
  GlobalRoutesContext,
  GlobalRoutesProvider,
} from "@/context/global_routes_provider";

export const BBContext = (props: { children: ReactNode }) => {
  return (
    <GlobalLoadingStateProvider>
      <GlobalRoutesProvider>{props.children}</GlobalRoutesProvider>
    </GlobalLoadingStateProvider>
  );
};
