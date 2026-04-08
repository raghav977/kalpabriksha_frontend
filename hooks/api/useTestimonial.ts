"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonialApi } from '@/lib/api';

export function useTestimonials(params?: { page?: number; limit?: number; search?: string; active?: boolean }) {
  return useQuery({
    queryKey: ['testimonial', 'list', params || {}],
    queryFn: () => testimonialApi.getAll(params as any),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useCreateTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => testimonialApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonial'] }),
  });
}



export function useTestimonial(id:number){
  return useQuery({
    queryKey: ['testimonial', 'detail', id],
    queryFn: () => testimonialApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
    
}

export function useActiveTestimonials(page?:number, limit?:number){
  return useQuery({
    queryKey: ['testimonial', 'active', {page, limit}],
    // testimonialApi.getActiveTestimonials expects (limit, page)
    queryFn: () => testimonialApi.getActiveTestimonials(limit ?? 5, page ?? 1),
    staleTime: 5 * 60 * 1000,
  });
}

