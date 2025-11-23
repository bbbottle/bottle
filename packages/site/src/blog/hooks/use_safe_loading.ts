import React, { useContext, useEffect } from "react";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";

export const useSafeArticleLoading = (safeSec: number, timeOutSec: number) => {
  const { isLoading, isFontLoading } = useContext(GlobalLoadingContext);
  const [isArticleLoading, setIsArticleLoading] = React.useState(true);
  const [isTimeout, setIsTimeout] = React.useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsArticleLoading(false);
    }, safeSec * 1000);

    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
    }, timeOutSec * 1000);

    return () => {
      clearTimeout(id);
      clearTimeout(timeoutId);
    };
  }, []);

  if (isTimeout) {
    return false;
  }

  return isFontLoading || isArticleLoading;
};
