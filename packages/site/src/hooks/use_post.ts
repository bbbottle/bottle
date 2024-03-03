import { useCallback } from "react";
import { API } from "@/constants/routes";
import { useAuthedFetcher } from "@/hooks/use_authed_fetcher";
import useSWRMutation from "swr/mutation";

export const usePost = () => {
  const authedFetcher = useAuthedFetcher();

  const req = useCallback(
    async (
      url: string,
      { arg }: { arg: { title: string; content: string } }
    ) => {
      return authedFetcher(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
    [authedFetcher]
  );

  const { trigger } = useSWRMutation(API.POST, req);

  return trigger;
};
