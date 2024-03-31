import React, { createContext, ReactNode } from "react";
import { EffectLayer } from "@/components/effect-layer/EffectLayer";

const EffectContext = createContext<any>({});

export const EffectContextProvider = (props: { children: ReactNode }) => {
  return (
    <EffectContext.Provider value={{}}>
      <>
        {/*<EffectLayer />*/}
        {props.children}
      </>
    </EffectContext.Provider>
  );
};
