'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { useBlogBySlug, useRecentBlogs } from '@/hooks/api';
import { Layout } from '@/components/layout/Layout';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { Calendar, User, Eye, Tag, ArrowLeft } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug);
  const { data: recentBlogs } = useRecentBlogs(3);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <LoadingSkeleton type="custom" className="h-8 w-3/4 mb-4" />
            <LoadingSkeleton type="custom" className="h-4 w-1/2 mb-8" />
            <LoadingSkeleton type="custom" className="h-96 w-full mb-8 rounded-2xl" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <LoadingSkeleton type="custom" className="h-4 w-full" />
                <LoadingSkeleton type="custom" className="h-4 w-full" />
                <LoadingSkeleton type="custom" className="h-4 w-3/4" />
              </div>
              <div className="space-y-4">
                <LoadingSkeleton type="custom" className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !blog) {
    return (
      <Layout>
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Blog Post Not Found</h1>
              <p className="text-slate-600 mb-8">
                {error instanceof Error ? error.message : 'Sorry, we couldn\'t find this blog post.'}
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Draft';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="py-12 bg-linear-to-b from-slate-50 to-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 mb-6 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Posts
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{blog.title}</h1>

              {/* Category Badge */}
              {blog.category && (
                <span className="inline-block px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-6">
                  {blog.category}
                </span>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-600 shrink-0" />
                    <span>{blog.author}</span>
                  </div>
                )}

                {blog.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600 shrink-0" />
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>
                )}

                {blog.viewCount && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-gray-600 shrink-0" />
                    <span>{blog.viewCount} views</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Featured Image */}
                {blog.featuredImage && (
                  <div className="relative h-96 rounded-2xl overflow-hidden bg-slate-200 shadow-lg">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blog.featuredImage}`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-gray-600 hover:prose-a:text-gray-700 prose-strong:text-slate-900">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content, {
                    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img'],
                    ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'target', 'rel', 'class', 'style'],
                  }) }} />
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-8 border-t border-slate-200"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Tag className="w-5 h-5 text-gray-600" />
                      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                        Tags
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Blog Info Card */}
                <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 p-8 sticky top-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Post Details</h3>

                  <div className="space-y-6">
                    {/* Author */}
                    {blog.author && (
                      <div>
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                          Author
                        </p>
                        <div className="flex items-center gap-2 text-slate-900">
                          <User className="w-5 h-5 text-gray-600 shrink-0" />
                          <span className="font-medium">{blog.author || "Kalpabriksh"}</span>
                        </div>
                      </div>
                    )}

                    {/* Published Date */}
                    {blog.publishedAt && (
                      <div>
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                          Published
                        </p>
                        <div className="flex items-center gap-2 text-slate-900">
                          <Calendar className="w-5 h-5 text-gray-600 shrink-0" />
                          <span className="font-medium">{formatDate(blog.publishedAt)}</span>
                        </div>
                      </div>
                    )}

                    {/* Views */}
                    {blog.viewCount && (
                      <div>
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                          Views
                        </p>
                        <div className="flex items-center gap-2 text-slate-900">
                          <Eye className="w-5 h-5 text-gray-600 shrink-0" />
                          <span className="font-medium">{blog.viewCount}</span>
                        </div>
                      </div>
                    )}

                    {/* Category */}
                    {blog.category && (
                      <div>
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                          Category
                        </p>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={() => window.history.back()}
                    className=" cursor-pointer w-full mt-8 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-colors"
                  > 
                    Go Back
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Related Posts */}
      {recentBlogs && recentBlogs.length > 0 && (
        <section className="py-16 bg-slate-50 border-t">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                More Articles
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Check out our latest blog posts and insights
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {recentBlogs
                .filter((b: any) => b.slug !== slug)
                .slice(0, 3)
                .map((relatedBlog: any) => (
                  <motion.div
                    key={relatedBlog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={`/blog/${relatedBlog.slug}`}
                      className="group bg-white rounded-2xl border border-slate-200 hover:border-gray-400 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
                    >
                      {/* Image */}
                      {relatedBlog.featuredImage ? (
                        <div className="relative h-40 bg-slate-200 overflow-hidden">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${relatedBlog.featuredImage}`}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-40 bg-linear-to-br from-gray-100 to-slate-100" />
                      )}

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Category */}
                        {relatedBlog.category && (
                          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                            {relatedBlog.category}
                          </span>
                        )}

                        {/* Title */}
                        <h3 className="font-bold text-slate-900 group-hover:text-gray-600 transition-colors mb-3 line-clamp-2 flex-1">
                          {relatedBlog.title}
                        </h3>

                        {/* Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-600">
                          {relatedBlog.author && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {relatedBlog.author}
                            </span>
                          )}
                          {relatedBlog.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(relatedBlog.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
