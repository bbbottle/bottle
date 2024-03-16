import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useFontLoading } from "@/hooks/use_font_loading";

type LoadingContext = {
  isLoading: boolean;
  isFontLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const GlobalLoadingContext = createContext<LoadingContext>({
  isFontLoading: false,
  isLoading: false,
  setIsLoading: () => false,
});

export const GlobalLoadingStateProvider = (props: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isFontLoading = useFontLoading();
  return (
    <GlobalLoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isFontLoading,
      }}
    >
      {props.children}
    </GlobalLoadingContext.Provider>
  );
};
