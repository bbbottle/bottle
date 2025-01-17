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
  const [routesMap, setRoutesMap] = useState<{[key: string]: routeInfo}>({});

  const addGlobalRoute = (r: routeInfo) => {
    setRoutesMap((prev) => ({ ...prev, [r.name]: r }));
  };

  const removeGlobalRoute = (routeName: string) => {
    setRoutesMap((prev) => {
      const copy = { ...prev };
      delete copy[routeName];
      return copy;
    });
  };

  const globalRoutes = Object.values(routesMap);

  return (
    <GlobalRoutesContext.Provider
      value={{ globalRoutes, addGlobalRoute, removeGlobalRoute }}
    >
      {props.children}
    </GlobalRoutesContext.Provider>
  );
};
