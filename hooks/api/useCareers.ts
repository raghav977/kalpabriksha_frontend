

export const careerKeys = {
  all: ["careers"] as const,
  list: () => [...careerKeys.all, "list"] as const,
  details: (id: number) => [...careerKeys.all, "details", id] as const,
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { careersApi } from "@/lib/api";

export function useCareers() {
  return useQuery({
    queryKey: careerKeys.list(),
    queryFn: () => careersApi.getAll(),
  });
}

export function useCareersList(params?: { page?: number; limit?: number; search?: string; active?: boolean }) {
  return useQuery({
    queryKey: [...careerKeys.list(), params || {}],
    queryFn: () => careersApi.getAll(params as any),
  staleTime: 5 * 60 * 1000,
  });
}

export function useCareer(id: number) {
  return useQuery({
    queryKey: careerKeys.details(id),
    queryFn: async () => {
      const result = await careersApi.getById(id);
      if (!result) {
        throw new Error('Failed to fetch career');
      }
      return result;
    },
    enabled: !!id,
  });
}

export function useCreateCareer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => careersApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: careerKeys.list() }),
  });
}

export function useUpdateCareer(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => careersApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: careerKeys.list() });
      qc.invalidateQueries({ queryKey: careerKeys.details(id) });
    },
  });
}

export function useDeleteCareer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => careersApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: careerKeys.list() }),
  });
}

export function usePublicCareers(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: [...careerKeys.list(), 'public', params || {}],
    queryFn: () => careersApi.getPublicCareers(params?.page, params?.limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicCareerById(id: number) {
  return useQuery({
    queryKey: [...careerKeys.details(id), 'public'],
    queryFn: () => careersApi.getPublicCareerById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}