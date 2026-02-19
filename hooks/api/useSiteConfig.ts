'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siteConfigApi, SiteConfig, SiteConfigObject } from '@/lib/api';

// Query Keys
export const siteConfigKeys = {
  all: ['siteConfig'] as const,
  lists: () => [...siteConfigKeys.all, 'list'] as const,
  category: (category: string) => [...siteConfigKeys.all, 'category', category] as const,
  key: (key: string) => [...siteConfigKeys.all, 'key', key] as const,
};

/**
 * Hook to fetch all site configurations
 */
export function useSiteConfigs(category?: string) {
  return useQuery({
    queryKey: category ? siteConfigKeys.category(category) : siteConfigKeys.lists(),
    queryFn: () => siteConfigApi.getAll(category),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

/**
 * Hook to fetch configs by category
 */
export function useSiteConfigByCategory(category: string) {
  return useQuery({
    queryKey: siteConfigKeys.category(category),
    queryFn: () => siteConfigApi.getByCategory(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single config by key
 */
export function useSiteConfigByKey(key: string) {
  return useQuery({
    queryKey: siteConfigKeys.key(key),
    queryFn: () => siteConfigApi.getByKey(key),
    enabled: !!key,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to create or update a config
 */
export function useUpsertSiteConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      key: string;
      value: any;
      type?: 'string' | 'json' | 'number' | 'boolean';
      category?: string;
      description?: string;
    }) => siteConfigApi.upsert(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteConfigKeys.all });
    },
  });
}

/**
 * Hook to update a config by key
 */
export function useUpdateSiteConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, ...data }: {
      key: string;
      value: any;
      type?: 'string' | 'json' | 'number' | 'boolean';
      category?: string;
      description?: string;
    }) => siteConfigApi.update(key, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteConfigKeys.all });
    },
  });
}

/**
 * Hook to delete a config
 */
export function useDeleteSiteConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (key: string) => siteConfigApi.delete(key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteConfigKeys.all });
    },
  });
}

/**
 * Hook to bulk update configs
 */
export function useBulkUpdateSiteConfigs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (configs: Array<{
      key: string;
      value: any;
      type?: 'string' | 'json' | 'number' | 'boolean';
      category?: string;
      description?: string;
    }>) => siteConfigApi.bulkUpdate(configs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteConfigKeys.all });
    },
  });
}

// Parsed config type
export interface ParsedSiteConfig {
  siteName: string;
  siteDescription: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  heroImages: string[];
  stats: {
    projects: number;
    clients: number;
    experience: number;
    team: number;
  };
  founderName?: string;
  founderTitle?: string;
  founderMessage?: string;
  founderImage?: string;
  mission?: string;
  vision?: string;
  coreValues?: string[];
}

/**
 * Hook to fetch and parse site config into a structured format
 */
export function useParsedSiteConfig() {
  const { data, ...rest } = useSiteConfigs();
  
  const parsedConfig: ParsedSiteConfig | undefined = data?.configs ? {
    siteName: data.configs.site_name || data.configs.siteName || '',
    siteDescription: data.configs.site_description || data.configs.siteDescription || '',
    logo: data.configs.logo || '',
    email: data.configs.email || data.configs.contact_email || '',
    phone: data.configs.phone || data.configs.contact_phone || '',
    address: data.configs.address || data.configs.contact_address || '',
    socialLinks: {
      facebook: data.configs.social_facebook || '',
      twitter: data.configs.social_twitter || '',
      linkedin: data.configs.social_linkedin || '',
      instagram: data.configs.social_instagram || '',
    },
    heroTitle: data.configs.hero_title || '',
    heroSubtitle: data.configs.hero_subtitle || '',
    heroImages: Array.isArray(data.configs.hero_images) ? data.configs.hero_images : [],
    stats: {
      projects: Number(data.configs.stats_projects) || 0,
      clients: Number(data.configs.stats_clients) || 0,
      experience: Number(data.configs.stats_experience) || 0,
      team: Number(data.configs.stats_team) || 0,
    },
    founderName: data.configs.founder_name || '',
    founderTitle: data.configs.founder_title || '',
    founderMessage: data.configs.founder_message || '',
    founderImage: data.configs.founder_image || '',
    mission: data.configs.mission || '',
    vision: data.configs.vision || '',
    coreValues: Array.isArray(data.configs.core_values) ? data.configs.core_values : [],
  } : undefined;
  
  return {
    data: parsedConfig,
    raw: data?.raw,
    configs: data?.configs,
    ...rest,
  };
}

/**
 * Alias for useParsedSiteConfig - used by public components
 * Returns raw config array for backward compatibility
 */
export function usePublicSiteConfig() {
  const { data, isLoading, error } = useSiteConfigs();
  
  return {
    data: data?.raw || [],
    isLoading,
    error,
    configs: data?.configs,
  };
}
