import React, { useContext } from "react";
import { CenterLinkList } from "@/components";
import { GlobalRoutesContext } from "@/context/global_routes_provider";
import { Version } from "@/components/Version";

export const Cover = (props: { className?: string }) => {
  const globalRouteCtx = useContext(GlobalRoutesContext);
  const routes = globalRouteCtx.globalRoutes;
  const pluginEntry =
    routes.length > 0 ? [{ to: "/plugins", name: "cd ./plugins" }] : [];
  return (
    <>
      <CenterLinkList
        spaceBetween
        className="select-none"
        links={[
          // {
          //   to: "/projects",
          //   name: "cd ./projects",
          // },
          {
            to: "/blog",
            name: "cd ./blog",
          },
          ...pluginEntry,
        ]}
        title=""
        footer={<Version className="" />}
      />
    </>
  );
};
