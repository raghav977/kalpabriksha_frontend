'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useBlog } from '@/hooks/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogsApi } from '@/lib/api';
import {
  PageHeader,
  FormCard,
  Input,
  Textarea,
  Select,
  Checkbox,
  ListInput,
  FormActions,
  LoadingSpinner,
  ErrorState,
  ImageUpload,
} from '@/components/admin';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { data: blog, isLoading, error } = useBlog(parseInt(id));
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'news',
    author: '',
    featuredImage: '',
    tags: [''],
    isFeatured: false,
    publishedAt: undefined as string | undefined,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        category: blog.category || 'news',
        author: blog.author || '',
        featuredImage: blog.featuredImage || '',
        tags: blog.tags?.length ? blog.tags : [''],
        isFeatured: blog.isFeatured || false,
        publishedAt: blog.publishedAt || undefined,
      });
    }
  }, [blog]);

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData) => blogsApi.update(parseInt(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs', id] });
      router.push('/admin/blogs');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags.filter(t => t.trim() !== '');
    updateMutation.mutate({ ...formData, tags });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const categoryOptions = [
    { value: 'news', label: 'News' },
    { value: 'technical', label: 'Technical' },
    { value: 'case-study', label: 'Case Study' },
    { value: 'insights', label: 'Insights' },
  ];

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Edit Blog Post" backButton />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div>
        <PageHeader title="Edit Blog Post" backButton />
        <ErrorState message="Failed to load blog post" onRetry={() => router.push('/admin/blogs')} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Edit Blog Post" backButton />

      <FormCard error={updateMutation.isError ? 'Failed to update blog post. Please try again.' : undefined}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                label="URL Slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="auto-generated-from-title"
                required
              />
            </div>
            <button
              type="button"
              onClick={generateSlug}
              className="self-end px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Generate
            </button>
          </div>

          <Input
            label="Author"
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            required
          />

          <Textarea
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={2}
            placeholder="Brief summary for previews..."
            required
          />

          <Textarea
            label="Content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={10}
            placeholder="Full blog post content (supports Markdown)..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              options={categoryOptions}
            />
            <div />
          </div>

          <ImageUpload
            label="Featured Image"
            value={formData.featuredImage}
            onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
            aspectRatio="video"
          />

          <ListInput
            label="Tags"
            items={formData.tags}
            onAdd={() => setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }))}
            onRemove={(index) => setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }))}
            onChange={(index, value) => setFormData(prev => ({
              ...prev,
              tags: prev.tags.map((t, i) => (i === index ? value : t)),
            }))}
            placeholder="Tag"
            addLabel="+ Add Tag"
          />

          <div className="flex gap-6">
            <Checkbox
              id="isFeatured"
              label="Featured Post"
              checked={formData.isFeatured}
              onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
            />
            <Checkbox
              id="publish"
              label="Published"
              checked={!!formData.publishedAt}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                publishedAt: e.target.checked ? new Date().toISOString() : undefined 
              }))}
            />
          </div>

          <FormActions
            submitLabel="Update Post"
            isSubmitting={updateMutation.isPending}
            onCancel={() => router.back()}
          />
        </form>
      </FormCard>
    </div>
  );
}
