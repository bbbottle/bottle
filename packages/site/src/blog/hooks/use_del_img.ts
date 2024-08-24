import { useAuthedFetcher } from "@/hooks/use_authed_fetcher";
import { useCallback } from "react";
import { API } from "@/constants/routes";

export const useDelImg = () => {
  const authedFetcher = useAuthedFetcher();

  const req = useCallback(
    async (url: string, { arg }: { arg: { id: number } }) => {
      return authedFetcher(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
    },
    [authedFetcher]
  );

  return useCallback(
    (id: number) => req(API.REMOVE_IMG, { arg: { id } }),
    [req]
  );
};
