export interface Config {
  supabaseToken?: string;
  userId?: string;
  expiresAt?: string;
  apiKey?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Stream {
  id: string;
  content: string;
  type: string;
  author: string;
  createdAt: string;
}
