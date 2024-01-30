import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useLocation, useRoutes } from "react-router-dom";

type LoadingContext = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const GlobalLoadingContext = createContext<LoadingContext>({
  isLoading: false,
  setIsLoading: () => false,
});

export const GlobalLoadingStateProvider = (props: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(false);
  }, [location.pathname]);

  return (
    <GlobalLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {props.children}
    </GlobalLoadingContext.Provider>
  );
};
