'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { projectsApi, Project } from '@/lib/api';

// Query Keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...projectKeys.lists(), filters] as const,
  featured: (limit?: number) => [...projectKeys.all, 'featured', limit] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,
  slug: (slug: string) => [...projectKeys.all, 'slug', slug] as const,
};

/**
 * Hook to fetch all projects with pagination
 */
export function useProjects(params?: {
  status?: string;
  featured?: boolean;
  active?: boolean;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: projectKeys.list(params || {}),
    queryFn: () => projectsApi.getAll(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch featured projects
 */
export function useFeaturedProjects(limit = 4) {
  return useQuery({
    queryKey: projectKeys.featured(limit),
    queryFn: () => projectsApi.getFeatured(limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single project by ID
 */
export function useProject(id: number) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a project by slug
 */
export function useProjectBySlug(slug: string) {
  return useQuery({
    queryKey: projectKeys.slug(slug),
    queryFn: () => projectsApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to prefetch project for better navigation
 */
export function usePrefetchProject() {
  const queryClient = useQueryClient();
  
  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: projectKeys.slug(slug),
      queryFn: () => projectsApi.getBySlug(slug),
    });
  };
}
