import { useAuthedFetcher } from "@/hooks/use_authed_fetcher";
import { useCallback } from "react";
import { API } from "@/constants/routes";

export const useDelPost = () => {
  const authedFetcher = useAuthedFetcher();

  const req = useCallback(
    async (url: string, { arg }: { arg: { title: string } }) => {
      return authedFetcher(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
    [authedFetcher]
  );

  return useCallback(
    (title: string) => req(API.REMOVE_POST, { arg: { title } }),
    [req]
  );
};
