import { API } from "@/constants/routes";
import useSWR from "swr";
import { useContext, useEffect } from "react";
import { GlobalLoadingContext } from "@/global_loading_state_provider";

export const usePosts = (name: string = "", suspense?: boolean) => {
  const { data, error } = useSWR(API.POSTS, {
    revalidateOnFocus: false,
    suspense,
  });

  let isLoading = !data && !error;
  const { setIsLoading } = useContext(GlobalLoadingContext);
  const titleList =
    isLoading || error
      ? []
      : data.map((p: any) => ({
          name: p.title,
          to: p.title,
        }));

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const posts =
    isLoading || name == "" || error
      ? data
      : data.find((p: any) => p.title == name);

  return {
    posts: posts,
    titleList,
    isError: error,
    isLoading: !data && !error,
  };
};
