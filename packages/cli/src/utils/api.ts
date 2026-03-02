import type { Post, Stream } from "../config/types.js";

const API_ENDPOINT = "https://api.bbki.ng";
const API_CF_ENDPOINT = "https://cf.bbki.ng";

// Post API
export async function fetchPosts(token: string): Promise<Post[]> {
  const response = await fetch(`${API_ENDPOINT}/posts`, {
    headers: {
      "X-Supabase-Auth": token,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch posts: ${error}`);
  }

  return response.json() as Promise<Post[]>;
}

export async function createPost(
  token: string,
  title: string,
  content: string
): Promise<Post> {
  const response = await fetch(`${API_ENDPOINT}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Supabase-Auth": token,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create post: ${error}`);
  }

  return response.json() as Promise<Post>;
}

export async function removePost(
  token: string,
  title: string
): Promise<void> {
  const response = await fetch(`${API_ENDPOINT}/remove_post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Supabase-Auth": token,
    },
    body: JSON.stringify({ title }),
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

export async function fetchStreams(
  limit?: number
): Promise<StreamResponse> {
  const url = new URL(`${API_CF_ENDPOINT}/streaming`);
  if (limit) {
    url.searchParams.set("limit", limit.toString());
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
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
    method: "DELETE",
    headers: {
      "x-api-key": apiKey,
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
        "x-api-key": apiKey,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
