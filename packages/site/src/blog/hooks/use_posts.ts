import { API_CF_ENDPOINT } from '@/constants/routes';
import useSWR from 'swr';
import { useContext, useEffect } from 'react';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';
import { cfApiFetcher } from '@/utils';

const POSTS_API = `${API_CF_ENDPOINT}/posts`;

export const usePosts = (name: string = '', suspense?: boolean) => {
  const { data: response, error } = useSWR(POSTS_API, cfApiFetcher, {
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
