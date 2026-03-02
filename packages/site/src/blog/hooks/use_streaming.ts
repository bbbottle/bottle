import useSWR from "swr";
import { baseFetcher, withBBApi } from "@/utils";
import { API_CF_ENDPOINT } from "@/constants/routes";

// In dev, use /api prefix to leverage Vite proxy to localhost:8787
const isProd = typeof window !== "undefined" && /^https:\/\/bbki.ng/.test(window.location.href);
const streamingFetcher = !isProd
  ? (resource: string, init?: RequestInit) => baseFetcher(`/api/${resource}`, init)
  : withBBApi(baseFetcher)(API_CF_ENDPOINT);

export type StreamingItem = {
  id: string;
  author: string;
  content: string;
  type?: string;
  createdAt: string;
};

export const useStreaming = () => {
  const { data, error } = useSWR("streaming", streamingFetcher, {
    revalidateOnFocus: true,
    refreshInterval: 1000,
  });

  return {
    streaming: data?.data as StreamingItem[] | undefined,
    isError: error,
    isLoading: !data && !error,
  };
};
