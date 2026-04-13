export interface Newspaper {
  id: number;
  title: string;
  url: string;
}

export interface Article {
  id: number;
  title: string;
  url: string;
  source: string;
  sourceIcon?: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  tags: string[];
  bookmarked: boolean;
  commentCount: number;
  upvotes: number;
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  username: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export type FilterType = 'all' | 'today' | 'week' | 'popular' | 'bookmarked';

export interface Category {
  id: string;
  name: string;
  color: string;
  count: number;
}
