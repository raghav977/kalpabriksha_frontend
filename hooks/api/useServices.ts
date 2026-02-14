'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi, Service } from '@/lib/api';

// Query Keys
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (filters: { active?: boolean }) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: number) => [...serviceKeys.details(), id] as const,
  slug: (slug: string) => [...serviceKeys.all, 'slug', slug] as const,
};

/**
 * Hook to fetch all services
 * @param active - Filter by active status
 */
export function useServices(active = true) {
  return useQuery({
    queryKey: serviceKeys.list({ active }),
    queryFn: () => servicesApi.getAll({ active }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
  });
}

/**
 * Hook to fetch a single service by ID
 */
export function useService(id: number) {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => servicesApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a service by slug
 */
export function useServiceBySlug(slug: string) {
  return useQuery({
    queryKey: serviceKeys.slug(slug),
    queryFn: () => servicesApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to prefetch services for better UX
 */
export function usePrefetchServices() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: serviceKeys.list({ active: true }),
      queryFn: () => servicesApi.getAll({ active: true }),
    });
  };
}
