import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { baseFetcher, withBBApi } from "@/utils";
import { API_CF_ENDPOINT } from "@/constants/routes";
import { useContext, useEffect, useState, useCallback } from "react";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";

// In dev, use /api prefix to leverage Vite proxy to localhost:8787
const isProd = typeof window !== "undefined" && /^https:\/\/bbki.ng/.test(window.location.href);
const API_BASE = !isProd ? "/api" : API_CF_ENDPOINT;

export type StreamingItem = {
  id: string;
  author: string;
  content: string;
  type?: string;
  createdAt: string;
};

interface StreamingResponse {
  status: string;
  data: StreamingItem[];
}

export interface StreamingQueryParams {
  /** Fetch records older than this ID (for pagination / next page) */
  before?: string;
  /** Fetch records newer than this ID (for polling / new messages) */
  after?: string;
  /** Number of records to fetch (default: 8, max: 100) */
  offset?: number;
}

/**
 * Build streaming API URL with query parameters
 */
function buildStreamingUrl(params: StreamingQueryParams = {}): string {
  const url = new URL(`${API_BASE}/streaming`, !isProd ? window.location.origin : undefined);

  if (params.before) {
    url.searchParams.set("before", params.before);
  }
  if (params.after) {
    url.searchParams.set("after", params.after);
  }
  if (params.offset) {
    url.searchParams.set("offset", params.offset.toString());
  }

  return !isProd ? url.pathname + url.search : url.toString();
}

/**
 * Fetch streaming data from API
 */
async function fetchStreaming(params: StreamingQueryParams = {}): Promise<StreamingResponse> {
  const url = buildStreamingUrl(params);
  const response = await baseFetcher(url);
  return response as StreamingResponse;
}

// SWR key generator for streaming queries
const getStreamingKey = (params: StreamingQueryParams) => {
  const parts = ["streaming"];
  if (params.before) parts.push(`before=${params.before}`);
  if (params.after) parts.push(`after=${params.after}`);
  if (params.offset) parts.push(`offset=${params.offset}`);
  return parts.join("?");
};

interface UseStreamingOptions {
  /** Polling interval in ms (default: 1000, set to 0 to disable) */
  refreshInterval?: number;
  /** Initial offset for first fetch (default: 8) */
  offset?: number;
}

/**
 * Hook for fetching streaming data with polling
 * Use this for simple cases where you just need the latest data
 */
export function useStreaming(options: UseStreamingOptions = {}) {
  const { refreshInterval = 1000, offset = 8 } = options;

  const key = getStreamingKey({ offset });

  const { data, error, mutate } = useSWR(key, () => fetchStreaming({ offset }), {
    revalidateOnFocus: true,
    refreshInterval,
  });

  const isLoading = !data && !error;

  const [_, forceUpdate] = useState(0);

  // make rerender when customElement defined
  useEffect(() => {
    customElements.whenDefined("bb-msg-history").then(() => {
      forceUpdate((prev) => prev + 1);
    });
  }, []);

  const { setIsLoading } = useContext(GlobalLoadingContext);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return {
    streaming: data?.data ?? [],
    isError: error,
    isLoading,
    /** Refetch data manually */
    mutate,
  };
}
