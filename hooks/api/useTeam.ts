'use client';

import { useQuery } from '@tanstack/react-query';
import { teamApi, TeamMember } from '@/lib/api';

// Query Keys
export const teamKeys = {
  all: ['team'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...teamKeys.lists(), filters] as const,
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: number) => [...teamKeys.details(), id] as const,
};

/**
 * Hook to fetch all team members with filtering
 */
export function useTeamMembers(params?: {
  active?: boolean;
  department?: string;
}) {
  return useQuery({
    queryKey: teamKeys.list(params || {}),
    queryFn: () => teamApi.getAll(params),
    staleTime: 10 * 60 * 1000, // 10 minutes - team data changes less frequently
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Hook to fetch a single team member by ID
 */
export function useTeamMember(id: number) {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: () => teamApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to get team members grouped by department
 */
export function useTeamByDepartment() {
  const { data: members, ...rest } = useTeamMembers({ active: true });
  
  const groupedMembers = members?.reduce((acc, member) => {
    const dept = member.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);
  
  return {
    data: groupedMembers,
    ...rest,
  };
}
