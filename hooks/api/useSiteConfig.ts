'use client';

import { useQuery } from '@tanstack/react-query';
import { siteConfigApi, SiteConfig } from '@/lib/api';

// Query Keys
export const siteConfigKeys = {
  all: ['siteConfig'] as const,
  lists: () => [...siteConfigKeys.all, 'list'] as const,
  key: (key: string) => [...siteConfigKeys.all, 'key', key] as const,
  group: (group: string) => [...siteConfigKeys.all, 'group', group] as const,
  public: () => [...siteConfigKeys.all, 'public'] as const,
};

/**
 * Hook to fetch all site configurations (admin)
 */
export function useSiteConfigs() {
  return useQuery({
    queryKey: siteConfigKeys.lists(),
    queryFn: () => siteConfigApi.getAll(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

/**
 * Hook to fetch public site configuration
 */
export function usePublicSiteConfig() {
  return useQuery({
    queryKey: siteConfigKeys.public(),
    queryFn: () => siteConfigApi.getPublic(),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
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
 * Hook to fetch configs by group
 */
export function useSiteConfigByGroup(group: string) {
  return useQuery({
    queryKey: siteConfigKeys.group(group),
    queryFn: () => siteConfigApi.getByGroup(group),
    enabled: !!group,
    staleTime: 10 * 60 * 1000,
  });
}

// Type for parsed site config
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
}

/**
 * Hook to fetch and parse site config into a structured format
 */
export function useParsedSiteConfig() {
  const { data: configs, ...rest } = usePublicSiteConfig();
  
  // Convert array of configs to structured object
  const parsedConfig: ParsedSiteConfig | undefined = configs ? configs.reduce((acc, config) => {
    switch (config.key) {
      case 'site_name':
        acc.siteName = config.value;
        break;
      case 'site_description':
        acc.siteDescription = config.value;
        break;
      case 'logo':
        acc.logo = config.value;
        break;
      case 'email':
        acc.email = config.value;
        break;
      case 'phone':
        acc.phone = config.value;
        break;
      case 'address':
        acc.address = config.value;
        break;
      case 'social_facebook':
        acc.socialLinks.facebook = config.value;
        break;
      case 'social_twitter':
        acc.socialLinks.twitter = config.value;
        break;
      case 'social_linkedin':
        acc.socialLinks.linkedin = config.value;
        break;
      case 'social_instagram':
        acc.socialLinks.instagram = config.value;
        break;
      case 'hero_title':
        acc.heroTitle = config.value;
        break;
      case 'hero_subtitle':
        acc.heroSubtitle = config.value;
        break;
      case 'hero_images':
        try {
          acc.heroImages = JSON.parse(config.value);
        } catch {
          acc.heroImages = [];
        }
        break;
      case 'stats_projects':
        acc.stats.projects = parseInt(config.value) || 0;
        break;
      case 'stats_clients':
        acc.stats.clients = parseInt(config.value) || 0;
        break;
      case 'stats_experience':
        acc.stats.experience = parseInt(config.value) || 0;
        break;
      case 'stats_team':
        acc.stats.team = parseInt(config.value) || 0;
        break;
    }
    return acc;
  }, {
    siteName: '',
    siteDescription: '',
    logo: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: {},
    heroTitle: '',
    heroSubtitle: '',
    heroImages: [],
    stats: { projects: 0, clients: 0, experience: 0, team: 0 },
  } as ParsedSiteConfig) : undefined;
  
  return {
    data: parsedConfig,
    ...rest,
  };
}
