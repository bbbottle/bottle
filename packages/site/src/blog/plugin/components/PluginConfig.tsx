import React from "react";
import { ReactNode, useContext, useEffect } from "react";
import { GlobalLoadingContext } from "@/global_loading_state_provider";
import { PluginManager } from "@/plugin/core/PluginManager";
import { toast } from "sonner";

export const PluginConfig = (props: { children: ReactNode }) => {
  const { setIsLoading } = useContext(GlobalLoadingContext);
  useEffect(() => {
    PluginManager.init({
      loading: setIsLoading,
      toast: (content: string) => {
        toast.success(content, {
          position: "top-center",
        });
      },
    });
  }, []);
  return <>{props.children}</>;
};
