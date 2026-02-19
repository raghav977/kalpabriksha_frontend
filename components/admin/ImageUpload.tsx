'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useUploadFile } from '@/hooks/api/useUpload';

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  aspectRatio?: 'square' | 'video' | 'wide';
}

export function ImageUpload({
  label,
  value,
  onChange,
  accept = 'image/*',
  maxSize = 5,
  aspectRatio = 'video',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadMutation = useUploadFile();

  console.log("This is upkloadmutation")

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[3/1]',
  };

  const handleFile = useCallback(async (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    try {
      const result = await uploadMutation.mutateAsync(file);
      console.log("This is result",result)
      // Backend returns { success: true, file: { url: '...' } }
      const uploadedUrl = result.file?.url
      onChange(uploadedUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    }
  }, [maxSize, onChange, uploadMutation]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onChange]);

  useEffect(()=>{
    console.log("This is value",value)
  },[value])


  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
      </label>

      {value ? (
        // Preview
        <div className={`relative ${aspectClasses[aspectRatio]} rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200`}>
         <img
  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${value}`}
  alt="Uploaded image"
  className="object-cover"
/>

          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        // Upload area
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`${aspectClasses[aspectRatio]} rounded-lg border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center ${
            isDragging
              ? 'border-neutral-900 bg-neutral-100'
              : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50'
          }`}
        >
          {uploadMutation.isPending ? (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-neutral-500">Uploading...</p>
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-neutral-600 mb-1">
                <span className="font-medium text-neutral-900">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-neutral-400">
                PNG, JPG, WebP up to {maxSize}MB
              </p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}

// Multiple image upload component
interface MultiImageUploadProps {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  maxSize?: number;
}

export function MultiImageUpload({
  label,
  values,
  onChange,
  maxImages = 10,
  maxSize = 5,
}: MultiImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadMutation = useUploadFile();

  const handleFiles = useCallback(async (files: FileList) => {
    setError(null);

    const newUrls: string[] = [];
    
    for (const file of Array.from(files)) {
      if (values.length + newUrls.length >= maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        break;
      }

      if (!file.type.startsWith('image/')) continue;
      if (file.size > maxSize * 1024 * 1024) continue;

      try {
        const result = await uploadMutation.mutateAsync(file);
        // Backend returns { success: true, file: { url: '...' } }
        const uploadedUrl = result.file?.url || result.url || result.path || result.filename;
        newUrls.push(uploadedUrl);
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    if (newUrls.length > 0) {
      onChange([...values, ...newUrls]);
    }
  }, [values, maxImages, maxSize, onChange, uploadMutation]);

  const handleRemove = useCallback((index: number) => {
    onChange(values.filter((_, i) => i !== index));
  }, [values, onChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Existing images */}
        {values.map((url, index) => (
          <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 group">
            <img src={url} alt={`Image ${index + 1}`} className="object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-100"
            >
              <span className="text-neutral-600 text-sm">×</span>
            </button>
          </div>
        ))}

        {/* Add more button */}
        {values.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadMutation.isPending}
            className="aspect-video rounded-lg border-2 border-dashed border-neutral-300 hover:border-neutral-400 bg-neutral-50 flex flex-col items-center justify-center transition-colors"
          >
            {uploadMutation.isPending ? (
              <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="text-2xl text-neutral-400 mb-1">+</span>
                <span className="text-xs text-neutral-500">Add Image</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
