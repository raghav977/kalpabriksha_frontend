'use client';

import Link from 'next/link';
import { useServices } from '@/hooks/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi, Service } from '@/lib/api';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  ErrorState,
} from '@/components/admin';

export default function AdminServicesPage() {
  const { data: services, isLoading, error, refetch } = useServices();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => servicesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  const columns = [
    {
      key: 'title',
      header: 'Service',
      render: (service: Service) => (
        <div>
          <p className="font-medium text-neutral-900">{service.title}</p>
          <p className="text-sm text-neutral-500 line-clamp-1">{service.shortDesc}</p>
        </div>
      ),
    },
    {
      key: 'icon',
      header: 'Icon',
      render: (service: Service) => (
        <span className="text-sm text-neutral-600 font-mono bg-neutral-100 px-2 py-1 rounded">
          {service.icon}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (service: Service) => (
        <StatusBadge
          status={service.isActive ? 'Active' : 'Inactive'}
          variant={service.isActive ? 'success' : 'default'}
        />
      ),
    },
    {
      key: 'sortOrder',
      header: 'Order',
      render: (service: Service) => <span className="text-neutral-500">{service.sortOrder}</span>,
    },
  ];

  if (error) {
    return (
      <div>
        <PageHeader
          title="Services"
          description="Manage your service offerings"
          action={
            <Link href="/admin/services/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
              + New Service
            </Link>
          }
        />
        <ErrorState message="Failed to load services. Make sure the backend is running." onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage your service offerings"
        action={
          <Link href="/admin/services/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
            + New Service
          </Link>
        }
      />
      <DataTable
        data={services || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No services found"
        emptyAction={{ href: '/admin/services/new', label: 'Create your first service' }}
        editHref={(service) => `/admin/services/${service.id}`}
        onDelete={(id) => deleteMutation.mutate(id)}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
