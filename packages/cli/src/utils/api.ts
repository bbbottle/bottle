import type { Post, Stream } from '../config/types.js';

const API_CF_ENDPOINT = 'https://cf.bbki.ng';

interface ApiResponse<T> {
  status: string;
  data: T;
}

// Post API
export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_CF_ENDPOINT}/posts`);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch posts: ${error}`);
  }

  const result = (await response.json()) as ApiResponse<Post[]>;
  return result.data;
}

export async function createPost(apiKey: string, title: string, content: string): Promise<Post> {
  const response = await fetch(`${API_CF_ENDPOINT}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create post: ${error}`);
  }

  const result = (await response.json()) as ApiResponse<Post>;
  return result.data;
}

export async function removePost(apiKey: string, id: string): Promise<void> {
  const response = await fetch(`${API_CF_ENDPOINT}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to remove post: ${error}`);
  }
}

// Streaming API
interface StreamResponse {
  status: string;
  data: Stream[];
}

export interface FetchStreamsOptions {
  /** Fetch records older than this ID (cursor-based pagination) */
  before?: string;
  /** Fetch records newer than this ID (for polling new messages) */
  after?: string;
  /** Number of records to fetch */
  offset?: number;
}

export async function fetchStreams(options: FetchStreamsOptions = {}): Promise<StreamResponse> {
  const { before, after, offset } = options;
  const url = new URL(`${API_CF_ENDPOINT}/streaming`);

  if (before) {
    url.searchParams.set('before', before);
  }
  if (after) {
    url.searchParams.set('after', after);
  }
  if (offset) {
    url.searchParams.set('offset', offset.toString());
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch streams: ${error}`);
  }

  return response.json() as Promise<StreamResponse>;
}

export async function createStream(
  apiKey: string,
  content: string,
  type: string,
  author: string
): Promise<{ data: Stream }> {
  const response = await fetch(`${API_CF_ENDPOINT}/streaming`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ content, type, author }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create stream: ${error}`);
  }

  return response.json() as Promise<{ data: Stream }>;
}

export async function removeStream(apiKey: string, id: string): Promise<void> {
  const response = await fetch(`${API_CF_ENDPOINT}/streaming/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to remove stream: ${error}`);
  }
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_CF_ENDPOINT}/streaming`, {
      headers: {
        'x-api-key': apiKey,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
