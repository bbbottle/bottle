import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { useContext } from "react";

export const useLoadingIndicator = () => {
  const globalCtx = useContext(GlobalLoadingContext);

  return {
    setVisibility: globalCtx.setIsLoading,
    isVisible: globalCtx.isLoading,
    isFontLoading: globalCtx.isFontLoading,
  };
};
