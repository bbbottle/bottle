import React, { createContext, ReactNode, useState } from "react";

type routeInfo = {
  name: string;
  to: string;
};

export type GlobalRoutesContextType = {
  globalRoutes: routeInfo[];
  addGlobalRoute: (r: routeInfo) => void;
  removeGlobalRoute: (routeName: string) => void;
};

export const GlobalRoutesContext = createContext<GlobalRoutesContextType>({
  globalRoutes: [],
  addGlobalRoute: () => {},
  removeGlobalRoute: () => {},
});

export const GlobalRoutesProvider = (props: { children: ReactNode }) => {
  const [globalRoutes, setGlobalRoutes] = useState<routeInfo[]>([]);

  const addGlobalRoute = (r: routeInfo) => {
    setGlobalRoutes([...globalRoutes, r]);
  };

  const removeGlobalRoute = (routeName: string) => {
    setGlobalRoutes(globalRoutes.filter((r) => r.name !== routeName));
  };

  return (
    <GlobalRoutesContext.Provider
      value={{ globalRoutes, addGlobalRoute, removeGlobalRoute }}
    >
      {props.children}
    </GlobalRoutesContext.Provider>
  );
};
