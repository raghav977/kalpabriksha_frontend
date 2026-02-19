'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useBlogBySlug, useRecentBlogs } from '@/hooks/api';
import { Layout } from '@/components/layout/Layout';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug);
  const { data: recentBlogs } = useRecentBlogs(3);

  if (isLoading) {
    return (
      <Layout>
        <article className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <LoadingSkeleton type="custom" className="h-8 w-3/4 mb-4" />
            <LoadingSkeleton type="custom" className="h-4 w-1/2 mb-8" />
            <LoadingSkeleton type="custom" className="h-96 w-full mb-8 rounded-2xl" />
            <div className="space-y-4">
              <LoadingSkeleton type="custom" className="h-4 w-full" />
              <LoadingSkeleton type="custom" className="h-4 w-full" />
              <LoadingSkeleton type="custom" className="h-4 w-3/4" />
            </div>
          </div>
        </article>
      </Layout>
    );
  }

  if (isError || !blog) {
    return (
      <Layout>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Blog post not found
            </h1>
            <p className="text-gray-600 mb-8">
              {error instanceof Error ? error.message : 'The post you are looking for does not exist.'}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-linear-to-br from-primary via-green-700 to-green-900 py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category */}
            <span className="inline-block bg-secondary text-gray-900 text-sm font-medium px-4 py-1 rounded-full mb-4">
              {blog.category}
            </span>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {blog.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Draft'}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {blog.viewCount} views
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {blog.featuredImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 -mt-16 shadow-xl"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blog.featuredImage}`}
                  alt={blog.title}
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {recentBlogs && recentBlogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              More Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {recentBlogs
                .filter((b) => b.slug !== slug)
                .slice(0, 3)
                .map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                  >
                    {relatedBlog.featuredImage ? (
                      <div className="relative h-40">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${relatedBlog.featuredImage}`}
                          alt={relatedBlog.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-linear-to-br from-primary/20 to-primary/40" />
                    )}
                    <div className="p-4">
                      <span className="text-xs text-primary font-medium">
                        {relatedBlog.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedBlog.title}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </div>
    </Layout>
  );
}
