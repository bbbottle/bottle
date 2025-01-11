import { threeColWrapper } from "@/components/with_wrapper";
import { CenterLinkList } from "@/components";
import React, { useContext } from "react";
import { GlobalRoutesContext } from "@/context/global_routes_provider";
import { useSafeArticleLoading } from "@/hooks/use_safe_loading";

const PluginRoutesContent = () => {
  const globalRouteCtx = useContext(GlobalRoutesContext);
  const routes = globalRouteCtx.globalRoutes;

  const isLoading = useSafeArticleLoading(0.2, 3);

  return (
    <CenterLinkList
      className="select-none"
      links={routes}
      title=""
      loading={isLoading}
    />
  );
};

export const PluginRoutes = threeColWrapper(PluginRoutesContent);
