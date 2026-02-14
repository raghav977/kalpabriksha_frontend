'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '@/lib/api';
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Select,
  Checkbox,
  FormActions,
  ImageUpload,
} from '@/components/admin';

export default function NewTeamMemberPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    bio: '',
    image: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    isActive: true,
    sortOrder: 0,
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => teamApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      router.push('/admin/team');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const departmentOptions = [
    { value: '', label: 'Select Department' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div>
      <PageHeader title="Add Team Member" backButton />

      <FormCard error={createMutation.isError ? 'Failed to create team member. Please try again.' : undefined}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-6">
            {/* Image Upload */}
            <div className="w-40 shrink-0">
              <ImageUpload
                label="Photo"
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                aspectRatio="square"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Position"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="e.g., Senior Engineer"
                  required
                />
                <Select
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  options={departmentOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+977 xxx xxx xxxx"
            />
          </div>

          <Textarea
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            rows={3}
            placeholder="Brief bio about the team member..."
          />

          <div className="border-t border-neutral-200 pt-4">
            <p className="text-sm font-medium text-neutral-700 mb-3">Social Links</p>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="LinkedIn"
                value={formData.linkedin}
                onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
              />
              <Input
                label="Facebook"
                value={formData.facebook}
                onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
                placeholder="https://facebook.com/..."
              />
              <Input
                label="Twitter"
                value={formData.twitter}
                onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>

          <div className="flex gap-6">
            <Input
              label="Sort Order"
              type="number"
              value={formData.sortOrder.toString()}
              onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
              className="w-32"
            />
            <div className="flex items-end pb-2">
              <Checkbox
                id="isActive"
                label="Active (visible on website)"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              />
            </div>
          </div>

          <FormActions
            submitLabel="Add Team Member"
            isSubmitting={createMutation.isPending}
            onCancel={() => router.back()}
          />
        </form>
      </FormCard>
    </div>
  );
}
