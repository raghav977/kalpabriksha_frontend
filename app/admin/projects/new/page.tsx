'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api';
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Select,
  Checkbox,
  ListInput,
  FormActions,
  ImageUpload,
} from '@/components/admin';

export default function NewProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    client: '',
    role: '',
    description: '',
    scope: [''],
    status: 'ongoing' as 'ongoing' | 'completed' | 'upcoming',
    isFeatured: false,
    featuredImage: '',
    location: '',
    isActive: true,
    sortOrder: 0,
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => projectsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      router.push('/admin/projects');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scope = formData.scope.filter(s => s.trim() !== '');
    createMutation.mutate({ ...formData, scope });
  };

  const statusOptions = [
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  return (
    <div>
      <PageHeader title="New Project" backButton />

      <FormCard error={createMutation.isError ? 'Failed to create project. Please try again.' : undefined}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Capacity"
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
              placeholder="e.g., 50 MW"
              required
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Client"
              value={formData.client}
              onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
              required
            />
            <Input
              label="Our Role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="e.g., Lead Consultant"
              required
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />

          <ImageUpload
            label="Featured Image"
            value={formData.featuredImage}
            onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
            aspectRatio="video"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as typeof formData.status }))}
              options={statusOptions}
            />
            <Input
              label="Sort Order"
              type="number"
              value={formData.sortOrder.toString()}
              onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <ListInput
            label="Project Scope"
            items={formData.scope}
            onAdd={() => setFormData(prev => ({ ...prev, scope: [...prev.scope, ''] }))}
            onRemove={(index) => setFormData(prev => ({ ...prev, scope: prev.scope.filter((_, i) => i !== index) }))}
            onChange={(index, value) => setFormData(prev => ({
              ...prev,
              scope: prev.scope.map((s, i) => (i === index ? value : s)),
            }))}
            placeholder="Scope item"
          />

          <div className="flex gap-6">
            <Checkbox
              id="isFeatured"
              label="Featured Project"
              checked={formData.isFeatured}
              onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
            />
            <Checkbox
              id="isActive"
              label="Active"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
          </div>

          <FormActions
            submitLabel="Create Project"
            isSubmitting={createMutation.isPending}
            onCancel={() => router.back()}
          />
        </form>
      </FormCard>
    </div>
  );
}
