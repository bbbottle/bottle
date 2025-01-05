import { useTextPlainFile } from "@/hooks/use_text_plain_file";
import { useContext, useEffect } from "react";
import { usePost } from "@/hooks/use_post";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";
import { useAuthedFetcher } from "@/hooks/use_authed_fetcher";
import { preload, useSWRConfig } from "swr";
import { API } from "@/constants/routes";

export type fileReader = (f: File) => void;
export const useFile2Post = (): fileReader => {
  const { content, title, reader } = useTextPlainFile();

  const { mutate } = useSWRConfig();

  const { setIsLoading } = useContext(GlobalLoadingContext);

  const post = usePost();

  useEffect(() => {
    if (!content || !title) {
      return;
    }

    setIsLoading(true);

    post(title, content)
      .then((r) => {
        mutate(API.POSTS).then();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [title, content]);

  return (f: File) => {
    reader(f);
  };
};
