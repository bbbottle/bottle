import { threeColWrapper } from "@/components/with_wrapper";
import { CenterLinkList } from "@/components";
import React, { useContext } from "react";
import { GlobalRoutesContext } from "@/context/global_routes_provider";

const PluginRoutesContent = () => {
  const globalRouteCtx = useContext(GlobalRoutesContext);
  const routes = globalRouteCtx.globalRoutes;

  return <CenterLinkList className="select-none" links={routes} title="" />;
};

export const PluginRoutes = threeColWrapper(PluginRoutesContent);
