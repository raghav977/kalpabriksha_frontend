'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi } from '@/lib/api';
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Checkbox,
  ListInput,
  FormActions,
} from '@/components/admin';

export default function NewServicePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    description: '',
    icon: 'Zap',
    features: [''],
    isActive: true,
    sortOrder: 0,
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => servicesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      router.push('/admin/services');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = formData.features.filter(f => f.trim() !== '');
    createMutation.mutate({ ...formData, features });
  };

  return (
    <div>
      <PageHeader title="New Service" backButton />

      <form onSubmit={handleSubmit}>
        <FormCard
          className="max-w-2xl"
          error={createMutation.isError ? 'Failed to create service. Please try again.' : null}
        >
          <div className="space-y-4">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />

            <Textarea
              label="Short Description"
              value={formData.shortDesc}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
              rows={2}
              required
            />

            <Textarea
              label="Full Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Icon (Lucide icon name)"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="Zap, Building, Droplet, etc."
              />
              <Input
                label="Sort Order"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <ListInput
              label="Features"
              items={formData.features}
              onAdd={() => setFormData(prev => ({ ...prev, features: [...prev.features, ''] }))}
              onRemove={(index) => setFormData(prev => ({
                ...prev,
                features: prev.features.filter((_, i) => i !== index),
              }))}
              onChange={(index, value) => setFormData(prev => ({
                ...prev,
                features: prev.features.map((f, i) => (i === index ? value : f)),
              }))}
              placeholder="Feature description"
              addLabel="+ Add Feature"
            />

            <Checkbox
              id="isActive"
              label="Active (visible on website)"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
          </div>

          <FormActions
            submitLabel="Create Service"
            isSubmitting={createMutation.isPending}
            onCancel={() => router.back()}
          />
        </FormCard>
      </form>
    </div>
  );
}
