import { useSupabaseSession } from '@/hooks/use_supa_session';
import { apiFetcher, withToken } from '@/utils';
import { useCallback, useMemo } from 'react';

export const useAuthedFetcher = () => {
  const { access_token: token } = useSupabaseSession() || {};
  const fetcherWithToken = useMemo(() => withToken(apiFetcher), []);
  return useCallback(fetcherWithToken(token), [token, fetcherWithToken]);
};
