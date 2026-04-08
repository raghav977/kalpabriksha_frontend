'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  PageHeader,
  PageLoading,
  FormCard,
  DataTable,
} from '@/components/admin';
import { useTestimonials } from '@/hooks/api/useTestimonial';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonialApi, Testimonial } from '@/lib/api';

type TestimonialResponse = {
  testimonials: Testimonial[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};


export default function TestimonialAdminPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useTestimonials({ page, limit });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => testimonialApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonial'] });

    },
  });



  if (error) {
    return <div className="text-red-500">Failed to load testimonials</div>;
  }

  const typedData = data as TestimonialResponse;

  const testimonials = typedData?.testimonials ?? [];
  const pagination = typedData?.pagination ?? {
    total: 0,
    page: 1,
    limit,
    pages: 1,
  };

  const columns = useMemo(
    () => [
      {
        key: 'quote',
        header: 'Quote',
        render: (t: Testimonial) => (
          <p className="text-sm text-neutral-900 truncate max-w-md">
            {t.quote}
          </p>
        ),
      },
      {
        key: 'name',
        header: 'Name',
        render: (t: Testimonial) => (
          <span className="font-medium text-neutral-900">{t.name}</span>
        ),
      },
      {
        key: 'company',
        header: 'Company',
        render: (t: Testimonial) => (
          <span className="text-sm text-neutral-600">
            {t.company || '-'}
          </span>
        ),
      },
      {
        key: 'isActive',
        header: 'Active',
        render: (t: Testimonial) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              t.isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t.isActive ? 'Active' : 'Inactive'}
          </span>
        ),
      },
    ],
    []



  );

    if (isLoading) return <PageLoading />;

  return (
    <div>
      <PageHeader
        title="Testimonial"
        description="Manage your testimonial"
        action={
          <Link
            href="/admin/testimonial/new"
            className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            + New testimonial
          </Link>
        }
      />

      <FormCard>
        <DataTable
          data={testimonials}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No testimonials"
          emptyAction={{
            href: '/admin/testimonial/new',
            label: 'Create your first testimonial',
          }}
          editHref={(t: Testimonial) => `/admin/testimonial/${t.id}`}
          onDelete={(id: number) => deleteMutation.mutate(id)}
          isDeleting={deleteMutation.isPending}
          pagination={{
            page: pagination.page,
            pages: pagination.pages,
            total: pagination.total,
            limit: pagination.limit,
            onPageChange: setPage,
            onLimitChange: (l: number) => {
              setLimit(l);
              setPage(1);
            },
          }}
        />
      </FormCard>
    </div>
  );
}