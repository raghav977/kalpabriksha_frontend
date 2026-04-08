import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsApi } from "@/lib/api";
import type { Event } from "@/types/event";

export const eventKeys = {
  all: ["events"] as const,
  list: () => [...eventKeys.all, "list"] as const,
  details: (id: number) => [...eventKeys.all, "details", id] as const,
};

export function useEventsList(params?: { page?: number; limit?: number; search?: string; active?: boolean }) {
  return useQuery({
    queryKey: [...eventKeys.list(), params || {}],
    queryFn: () => eventsApi.getAll(params as any),
    staleTime: 5 * 60 * 1000,
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: eventKeys.details(id),
    queryFn: async () => {
      const result = await eventsApi.getById(id);
      if (!result) {
        throw new Error('Failed to fetch event');
      }
      return result;
    },
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => eventsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.list() }),
  });
}

export function useUpdateEvent(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => eventsApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.list() });
      qc.invalidateQueries({ queryKey: eventKeys.details(id) });
    },
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => eventsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.list() }),
  });
}

export function usePublicEvents(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: [...eventKeys.list(), 'public', params || {}],
    queryFn: () => eventsApi.getPublicEvents(params?.page, params?.limit, params?.search),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicEventById(id: number) {
  return useQuery({
    queryKey: [...eventKeys.details(id), 'public'],
    queryFn: () => eventsApi.getPublicEventById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
