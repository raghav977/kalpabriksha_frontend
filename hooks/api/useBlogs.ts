'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { blogsApi, Blog } from '@/lib/api';

// Query Keys
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...blogKeys.lists(), filters] as const,
  recent: (limit?: number) => [...blogKeys.all, 'recent', limit] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (id: number) => [...blogKeys.details(), id] as const,
  slug: (slug: string) => [...blogKeys.all, 'slug', slug] as const,
};

/**
 * Hook to fetch all blogs with pagination and filtering
 */
export function useBlogs(params?: {
  status?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: blogKeys.list(params || {}),
    queryFn: () => blogsApi.getAll(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch recent blogs for homepage/sidebar
 */
export function useRecentBlogs(limit = 3) {
  return useQuery({
    queryKey: blogKeys.recent(limit),
    queryFn: () => blogsApi.getRecent(limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single blog by ID
 */
export function useBlog(id: number) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => blogsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a blog by slug (SEO-friendly URLs)
 */
export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: blogKeys.slug(slug),
    queryFn: () => blogsApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to prefetch blog for better navigation
 */
export function usePrefetchBlog() {
  const queryClient = useQueryClient();
  
  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: blogKeys.slug(slug),
      queryFn: () => blogsApi.getBySlug(slug),
    });
  };
}
