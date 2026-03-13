export interface Config {
  apiKey?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stream {
  id: string;
  content: string;
  type: string;
  author: string;
  createdAt: string;
}
