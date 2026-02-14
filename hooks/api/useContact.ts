'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contactApi, ContactSubmission } from '@/lib/api';

// Query Keys
export const contactKeys = {
  all: ['contact'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...contactKeys.lists(), filters] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: number) => [...contactKeys.details(), id] as const,
};

// Contact form data type
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

/**
 * Hook to submit contact form
 * No authentication required - public endpoint
 */
export function useSubmitContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ContactFormData) => contactApi.create(data),
    onSuccess: () => {
      // Optionally invalidate any related queries
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}

/**
 * Hook to submit inquiry (alias for contact)
 */
export function useSubmitInquiry() {
  return useSubmitContact();
}

// Admin hooks for managing contact submissions

/**
 * Hook to mark contact as read (admin)
 */
export function useMarkContactRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id }: { id: number }) => contactApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}

/**
 * Hook to respond to contact (admin)
 */
export function useRespondToContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, response }: { id: number; response: string }) => 
      contactApi.respond(id, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}

/**
 * Hook to delete contact submission (admin)
 */
export function useDeleteContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => contactApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
}
