import useSWR, { useSWRConfig } from "swr";
import { API } from "@/constants/routes";
import { useCallback, useContext, useEffect } from "react";
import { Photo } from "@/types/photo";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";

export const useProjects = (name: string = "", suspense?: boolean) => {
  const URL = `${API.PROJECTS}${name ? "/" : ""}${name}`;

  const { data, error } = useSWR(URL, {
    revalidateOnFocus: false,
    suspense,
  });

  let isLoading = !data && !error;

  const { setIsLoading } = useContext(GlobalLoadingContext);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const { mutate, cache } = useSWRConfig();

  const getCachedProjects = (n: string) => {
    if (!n) {
      return;
    }
    return cache
      .get("projects")
      ?.data.find((p: { name: string }) => p.name === n);
  };

  const refresh = useCallback(() => {
    return mutate(URL);
  }, [URL]);

  const addLocalPhotoImmediately = useCallback(
    (photo: Photo) => {
      if (!name) {
        return;
      }

      if (!data || error) {
        return;
      }

      return mutate(
        URL,
        {
          ...data,
          images: [photo, ...data.images],
        },
        false
      );
    },
    [data, error]
  );

  return {
    refresh,
    addLocalPhotoImmediately,
    projects: data || getCachedProjects(name),
    isError: error,
    isLoading: !data && !error,
  };
};
