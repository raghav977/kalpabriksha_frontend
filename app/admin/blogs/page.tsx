'use client';

import Link from 'next/link';

import { useBlogs } from '@/hooks/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsApi, Blog } from '@/lib/api';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  ErrorState,
} from '@/components/admin';

export default function AdminBlogsPage() {
  const { data, isLoading, error, refetch } = useBlogs();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => blogsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const blogs = data?.blogs || [];
  console.log("this is blogs",blogs);

  const columns = [
    {
      key: 'title',
      header: 'Article',
      render: (blog: Blog) => (
        <div className="flex items-center gap-3">
          {blog.featuredImage ? (
            <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blog.featuredImage}`}
                alt={blog.title}

                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
              <span className="text-neutral-400 text-sm">◇</span>
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-neutral-900 truncate">{blog.title}</p>
            <p className="text-sm text-neutral-500 line-clamp-1">{blog.excerpt}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (blog: Blog) => (
        <span className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full font-medium">
          {blog.category}
        </span>
      ),
    },
    {
      key: 'author',
      header: 'Author',
      render: (blog: Blog) => <span className="text-neutral-600">{blog.author}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (blog: Blog) => (
        <StatusBadge 
          status={blog.status=='published' ? 'Published' : 'Draft'} 
          variant={blog.publishedAt ? 'success' : 'warning'} 
        />
      ),
    },
    {
      key: 'isFeatured',
      header: 'Featured',
      render: (blog: Blog) => (
        blog.isFeatured ? (
          <span className="w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center text-white text-xs">Yes</span>
        ) : (
          <span className="w-5 h-5 border border-neutral-200 rounded-full">No</span>
        )
      ),
    },
  ];

  if (error) {
    return (
      <div>
        <PageHeader
          title="Blog Posts"
          description="Manage your blog content"
          action={
            <Link href="/admin/blogs/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
              + New Post
            </Link>
          }
        />
        <ErrorState message="Failed to load blog posts. Make sure the backend is running." onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        description="Manage your blog content"
        action={
          <Link href="/admin/blogs/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
            + New Post
          </Link>
        }
      />
      <DataTable
        data={blogs}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No blog posts found"
        emptyAction={{ href: '/admin/blogs/new', label: 'Create your first blog post' }}
        editHref={(blog) => `/admin/blogs/${blog.id}`}
        onDelete={(id) => deleteMutation.mutate(id)}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
