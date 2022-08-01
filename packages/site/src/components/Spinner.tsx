import React, { useContext, useEffect } from "react";
import { GlobalLoadingContext } from "@/global_loading_state_provider";
import { LoadingSpiral } from "@bbki.ng/components";

export const Spinner = (props: { disableDotIndicator?: boolean }) => {
  const {
    disableDotIndicator,
  } = props;

  const { setIsLoading } = useContext(GlobalLoadingContext);

  useEffect(() => {
    if (disableDotIndicator) {
      return;
    }
    setIsLoading(true);
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="h-full w-full grid place-items-center">
      <LoadingSpiral
        className="relative -top-128"
      />
    </div>
  );
};
