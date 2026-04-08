'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';

import { useProjects } from '@/hooks/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi, Project } from '@/lib/api';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  getStatusVariant,
  ErrorState,
} from '@/components/admin';

export default function AdminProjectsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [statusFilter, setStatusFilter] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [activeOnly, setActiveOnly] = useState(false);

  // debounce search input to avoid firing API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, error, refetch } = useProjects({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
    featured: featuredOnly,
    active: activeOnly,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const projects = data?.projects || [];
  const pagination = data?.pagination || { total: 0, page: 1, limit, pages: 1 };

  const columns = useMemo(() => [
    {
      key: 'name',
      header: 'Project',
      render: (project: Project) => (
        <div className="flex items-center gap-3">
          {project.featuredImage ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${project.featuredImage}`}
                alt={project.name}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
              <span className="text-neutral-400 text-sm">◉</span>
            </div>
          )}
          <div>
            <p className="font-medium text-neutral-900">{project.name}</p>
            <p className="text-sm text-neutral-500">{project.capacity}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'client',
      header: 'Client',
      render: (project: Project) => <span className="text-neutral-600">{project.client}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (project: Project) => (
        <StatusBadge status={project.status} variant={getStatusVariant(project.status)} />
      ),
    },
    {
      key: 'isFeatured',
      header: 'Featured',
      render: (project: Project) => (
        project.isFeatured ? (
          <span className="w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center text-white text-xs">✓</span>
        ) : (
          <span className="w-5 h-5 border border-neutral-200 rounded-full" />
        )
      ),
    },
  ], []);

  if (error) {
    return (
      <div>
        <PageHeader
          title="Projects"
          description="Manage your project portfolio"
          action={
            <Link href="/admin/projects/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
              + New Project
            </Link>
          }
        />
        <ErrorState message="Failed to load projects. Make sure the backend is running." onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Manage your project portfolio"
        action={
          <Link href="/admin/projects/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
            + New Project
          </Link>
        }
      />

      <div className="mb-4 flex gap-3 items-center">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search projects..."
          className="border rounded px-3 py-2 text-sm w-64"
        />
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="border rounded px-3 py-2 text-sm">
          <option value="">All status</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featuredOnly} onChange={(e) => { setFeaturedOnly(e.target.checked); setPage(1); }} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={activeOnly} onChange={(e) => { setActiveOnly(e.target.checked); setPage(1); }} />
          Active
        </label>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No projects found"
        emptyAction={{ href: '/admin/projects/new', label: 'Create your first project' }}
        editHref={(project) => `/admin/projects/${project.id}`}
        onDelete={(id) => deleteMutation.mutate(id)}
        isDeleting={deleteMutation.isPending}
        pagination={{
          page: pagination.page,
          pages: pagination.pages,
          total: pagination.total,
          limit: pagination.limit,
          onPageChange: (p) => setPage(p),
          onLimitChange: (l) => { setLimit(l); setPage(1); },
        }}
      />
    </div>
  );
}
