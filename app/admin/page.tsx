'use client';

import { useServices, useProjects, useBlogs, useTeamMembers } from '@/hooks/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: services, isLoading: loadingServices } = useServices();
  const { data: projectsData, isLoading: loadingProjects } = useProjects();
  const { data: blogsData, isLoading: loadingBlogs } = useBlogs();
  const { data: team, isLoading: loadingTeam } = useTeamMembers();

  const stats = [
    {
      label: 'Services',
      value: services?.length || 0,
      loading: loadingServices,
      href: '/admin/services',
    },
    {
      label: 'Projects',
      value: projectsData?.projects?.length || 0,
      loading: loadingProjects,
      href: '/admin/projects',
    },
    {
      label: 'Blog Posts',
      value: blogsData?.blogs?.length || 0,
      loading: loadingBlogs,
      href: '/admin/blogs',
    },
    {
      label: 'Team',
      value: team?.length || 0,
      loading: loadingTeam,
      href: '/admin/team',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Overview of your content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-colors"
          >
            <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
            {stat.loading ? (
              <div className="h-8 w-12 bg-neutral-100 animate-pulse rounded" />
            ) : (
              <p className="text-3xl font-semibold text-neutral-900">{stat.value}</p>
            )}
            <p className="text-xs text-neutral-400 mt-2 group-hover:text-neutral-600 transition-colors">
              View all →
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-sm font-medium text-neutral-900 mb-4 uppercase tracking-wide">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction href="/admin/services/new" label="New Service" />
          <QuickAction href="/admin/projects/new" label="New Project" />
          <QuickAction href="/admin/blogs/new" label="New Post" />
          <QuickAction href="/" label="View Site" external />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-neutral-500 hover:text-neutral-900">
              View all
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {loadingProjects ? (
              <LoadingRows />
            ) : projectsData?.projects?.length ? (
              projectsData.projects.slice(0, 4).map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center justify-between px-6 py-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{project.name}</p>
                    <p className="text-sm text-neutral-500">{project.client}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </Link>
              ))
            ) : (
              <EmptyState message="No projects yet" href="/admin/projects/new" />
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-medium text-neutral-900">Recent Posts</h2>
            <Link href="/admin/blogs" className="text-xs text-neutral-500 hover:text-neutral-900">
              View all
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {loadingBlogs ? (
              <LoadingRows />
            ) : blogsData?.blogs?.length ? (
              blogsData.blogs.slice(0, 4).map((blog) => (
                <Link
                  key={blog.id}
                  href={`/admin/blogs/${blog.id}`}
                  className="flex items-center justify-between px-6 py-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{blog.title}</p>
                    <p className="text-sm text-neutral-500">{blog.category}</p>
                  </div>
                  <StatusBadge status={blog.publishedAt ? 'published' : 'draft'} />
                </Link>
              ))
            ) : (
              <EmptyState message="No posts yet" href="/admin/blogs/new" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const Component = external ? 'a' : Link;
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  
  return (
    <Component
      href={href}
      {...props}
      className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
    >
      <span className="text-lg">+</span>
      {label}
    </Component>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    completed: 'bg-neutral-900 text-white',
    ongoing: 'bg-neutral-200 text-neutral-700',
    upcoming: 'bg-neutral-100 text-neutral-500',
    published: 'bg-neutral-900 text-white',
    draft: 'bg-neutral-200 text-neutral-600',
  };
  
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles[status as keyof typeof styles] || 'bg-neutral-100 text-neutral-600'}`}>
      {status}
    </span>
  );
}

function LoadingRows() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="px-6 py-3">
          <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse mb-2" />
          <div className="h-3 w-24 bg-neutral-100 rounded animate-pulse" />
        </div>
      ))}
    </>
  );
}

function EmptyState({ message, href }: { message: string; href: string }) {
  return (
    <div className="px-6 py-8 text-center">
      <p className="text-neutral-500 text-sm mb-2">{message}</p>
      <Link href={href} className="text-sm text-neutral-900 hover:underline">
        Create one →
      </Link>
    </div>
  );
}
