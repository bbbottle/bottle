import useSWR from 'swr';
import { useContext, useEffect } from 'react';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';
import { baseFetcher } from '@/utils';
import { API_CF_ENDPOINT } from '@/constants/routes';

// In dev, use /api prefix to leverage Vite proxy to localhost:8787
const isProd = typeof window !== 'undefined' && /^https:\/\/bbki\.ng/.test(window.location.href);
const POSTS_API = !isProd ? '/api/posts' : `${API_CF_ENDPOINT}/posts`;

// Use baseFetcher for full URLs, cfApiFetcher is for relative paths
const postsFetcher = (resource: string) => baseFetcher(resource);

export const usePosts = (name: string = '', suspense?: boolean) => {
  const { data: response, error } = useSWR(POSTS_API, postsFetcher, {
    revalidateOnFocus: false,
    suspense,
  });

  // Extract posts array from API response { status: "success", data: [...] }
  const data = response?.data;

  let isLoading = !data && !error;
  const { setIsLoading } = useContext(GlobalLoadingContext);
  const titleList =
    isLoading || error || !data
      ? []
      : data.map((p: any) => ({
          name: p.title,
          to: p.title,
        }));

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const posts =
    isLoading || name == '' || error || !data ? data : data.find((p: any) => p.title == name);

  return {
    posts: posts,
    titleList,
    isError: error,
    isLoading: !data && !error,
  };
};
