import { useSupabaseSession } from "@/hooks/use_supa_session";
import { apiFetcher, withToken } from "@/utils";
import { useCallback } from "react";

export const useAuthedFetcher = () => {
  const { access_token: token } = useSupabaseSession() || {};
  return useCallback(withToken(apiFetcher)(token), [token]);
};
