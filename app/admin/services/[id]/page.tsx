'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi, Service } from '@/lib/api';
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Checkbox,
  ListInput,
  FormActions,
  PageLoading,
} from '@/components/admin';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params?.id as string);
  const queryClient = useQueryClient();

  const { data: service, isLoading } = useQuery({
    queryKey: ['services', id],
    queryFn: () => servicesApi.getById(id),
    enabled: !!id,
  });

  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    description: '',
    icon: 'Zap',
    features: [''],
    isActive: true,
    sortOrder: 0,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        shortDesc: service.shortDesc,
        description: service.description || '',
        icon: service.icon,
        features: service.features?.length ? service.features : [''],
        isActive: service.isActive,
        sortOrder: service.sortOrder,
      });
    }
  }, [service]);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Service>) => servicesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      router.push('/admin/services');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = formData.features.filter(f => f.trim() !== '');
    updateMutation.mutate({ ...formData, features });
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      <PageHeader title="Edit Service" backButton />

      <form onSubmit={handleSubmit}>
        <FormCard
          className="max-w-2xl"
          error={updateMutation.isError ? 'Failed to update service. Please try again.' : null}
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
            submitLabel="Save Changes"
            isSubmitting={updateMutation.isPending}
            onCancel={() => router.back()}
          />
        </FormCard>
      </form>
    </div>
  );
}
