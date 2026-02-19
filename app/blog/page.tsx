'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { useBlogs, usePrefetchBlog } from '@/hooks/api';
import { Layout } from '@/components/layout/Layout';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function BlogPage() {
  const { data, isLoading, isError, error } = useBlogs({ limit: 9 });
  const prefetchBlog = usePrefetchBlog();

  if (isLoading) {
    return (
      <Layout>
        <section className="bg-linear-to-br from-primary via-green-700 to-green-900 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Insights, news, and articles from our engineering experts
            </p>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LoadingSkeleton key={i} type="custom" className="h-80 rounded-2xl" />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Unable to load blog posts
            </h1>
            <p className="text-gray-600 mb-8">
              {error instanceof Error ? error.message : 'Something went wrong. Please try again later.'}
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const blogs = data?.blogs || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-green-700 to-green-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Insights, news, and articles from our engineering experts about hydropower, 
            renewable energy, and sustainable infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                No blog posts yet
              </h2>
              <p className="text-gray-500">
                Check back soon for insightful articles from our team.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link
                    href={`/blog/${blog.slug}`}
                    onMouseEnter={() => prefetchBlog(blog.slug)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {blog.featuredImage ? (
                        <img
                          src={`http://localhost:8000${blog.featuredImage}`}
                          alt={blog.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                          <span className="text-primary/50 text-6xl font-bold">
                            {blog.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <time>
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Draft'}
                        </time>
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>

                      <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                        Read More
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest insights on hydropower, 
            renewable energy, and engineering innovation.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-secondary text-gray-900 font-semibold rounded-full hover:bg-secondary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
