'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { useEventsList } from '@/hooks/api/useEvents';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '@/lib/api';
import {
  PageHeader,
  DataTable,
  ErrorState,
} from '@/components/admin';
import type { Event } from '@/types/event';

// Helper function to get image URL from various formats
const getImageUrl = (imageValue: any): string => {
  if (typeof imageValue === 'string') {
    return imageValue;
  }
  return imageValue?.url || imageValue?.file?.url || '';
};

export default function AdminEventsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [activeOnly, setActiveOnly] = useState(false);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, error, refetch } = useEventsList({
    page,
    limit,
    search: debouncedSearch || undefined,
    active: activeOnly,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => eventsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const events = data?.events || [];
  const pagination = data?.pagination || { total: 0, page: 1, limit, pages: 1 };

  const columns = useMemo(() => [
    {
      key: 'title',
      header: 'Event',
      render: (event: Event) => (
        <div className="flex items-center gap-3">
          {event.images && event.images.length > 0 ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${getImageUrl(event.images[0])}`}
                alt={event.title}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
              <span className="text-neutral-400 text-sm">📅</span>
            </div>
          )}
          <div>
            <p className="font-medium text-neutral-900">{event.title}</p>
            <p className="text-sm text-neutral-500">{event.location}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (event: Event) => (
        <span className="text-neutral-600 text-sm">
          {new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (event: Event) => (
        <span className="text-neutral-600 text-sm line-clamp-2">
          {event.description}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (event: Event) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            event.isActive
              ? 'bg-green-100 text-green-700'
              : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          {event.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ], []);

  if (error) {
    return (
      <div>
        <PageHeader
          title="Events"
          description="Manage your events"
          action={
            <Link
              href="/admin/events/new"
              className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              + New Event
            </Link>
          }
        />
        <ErrorState
          message="Failed to load events. Make sure the backend is running."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Events"
        description="Manage your events"
        action={
          <Link
            href="/admin/events/new"
            className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            + New Event
          </Link>
        }
      />

      <div className="mb-4 flex gap-3 items-center">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search events..."
          className="border rounded px-3 py-2 text-sm w-64"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={(e) => {
              setActiveOnly(e.target.checked);
              setPage(1);
            }}
          />
          Active Only
        </label>
      </div>

      <DataTable
        data={events}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No events found"
        emptyAction={{ href: '/admin/events/new', label: 'Create your first event' }}
        editHref={(event) => `/admin/events/${event.id}`}
        onDelete={(id) => deleteMutation.mutate(id)}
        isDeleting={deleteMutation.isPending}
        pagination={{
          page: pagination.page,
          pages: pagination.pages,
          total: pagination.total,
          limit: pagination.limit,
          onPageChange: (p) => setPage(p),
          onLimitChange: (l) => {
            setLimit(l);
            setPage(1);
          },
        }}
      />
    </div>
  );
}