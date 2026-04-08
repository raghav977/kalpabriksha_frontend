'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '@/lib/api';
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Checkbox,
  FormActions,
  MultiImageUpload,
  FileUpload,
} from '@/components/admin';

export default function NewEventPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    isActive: true,
    images: [] as string[],
    files: [] as any[],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => eventsApi.create(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push('/admin/events');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    createMutation.mutate(formData);
  };

  return (
    <div>
      <PageHeader title="New Event" backButton />

      <FormCard error={createMutation.isError ? 'Failed to create event. Please try again.' : undefined}>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <Input
            label="Event Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          {/* Description */}
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            placeholder="Event description..."
            required
          />

          {/* Date & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Event Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Event location"
              required
            />
          </div>

          {/* Images */}
          <MultiImageUpload 
            label="Event Images" 
            values={formData.images} 
            maxImages={10} 
            onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
          />

          {/* Files */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">Event Files</label>
            <div className="space-y-2">
              {formData.files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
                  <span className="text-sm">{file.filename || file}</span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      files: prev.files.filter((_, i) => i !== idx)
                    }))}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <FileUpload 
              label="Add File" 
              value="" 
              onChange={(url: string) => {
                setFormData(prev => ({
                  ...prev,
                  files: [...prev.files, { url, filename: url.split('/').pop() }]
                }));
              }}
            />
          </div>

          {/* Active Status */}
          <Checkbox
            id="isActive"
            label="Active"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          />

          <FormActions
            submitLabel="Create Event"
            isSubmitting={createMutation.isPending}
            onCancel={() => router.back()}
          />
        </form>
      </FormCard>
    </div>
  );
}
