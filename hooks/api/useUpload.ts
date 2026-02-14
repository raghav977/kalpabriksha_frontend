'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadApi } from '@/lib/api';

/**
 * Hook to upload a single file
 */
export function useUploadFile() {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      return uploadApi.uploadFile(formData);
    },
  });
}

/**
 * Hook to upload multiple files
 */
export function useUploadFiles() {
  return useMutation({
    mutationFn: (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });
      return uploadApi.uploadFiles(formData);
    },
  });
}

/**
 * Hook to delete a file
 */
export function useDeleteFile() {
  return useMutation({
    mutationFn: (filename: string) => uploadApi.deleteFile(filename),
  });
}
