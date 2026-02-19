'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useProjectBySlug } from '@/hooks/api';
import { Layout } from '@/components/layout/Layout';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { MapPin, Calendar, Building2, CheckCircle, ArrowLeft, ExternalLink, Zap } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const { data: project, isLoading, isError, error } = useProjectBySlug(slug);

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

  if (isError || !project) {
    return (
      <Layout>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Project not found
            </h1>
            <p className="text-gray-600 mb-8">
              {error instanceof Error ? error.message : 'The project you are looking for does not exist.'}
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const imageUrl = project.featuredImage 
    ? (project.featuredImage.startsWith('http') 
        ? project.featuredImage 
        : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${project.featuredImage}`)
    : null;

  // Parse scope if it's a string
  const scope = typeof project.scope === 'string' 
    ? JSON.parse(project.scope || '[]') 
    : (project.scope || []);

  // Parse images if it's a string
  const images = typeof project.images === 'string'
    ? JSON.parse(project.images || '[]')
    : (project.images || []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-100 bg-slate-900">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={project.name}
            className="object-cover opacity-40 border w-full h-full"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                href="/projects"
                className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                {project.capacity && (
                  <span className="px-3 py-1 bg-yellow-400 text-slate-900 text-sm font-medium rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {project.capacity}
                  </span>
                )}
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  project.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : project.status === 'ongoing'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {project.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                {project.location && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {project.location}
                  </span>
                )}
                {project.client && (
                  <span className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {project.client}
                  </span>
                )}
                {project.completionDate && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {new Date(project.completionDate).getFullYear()}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p className="whitespace-pre-wrap">{project.description || 'No description available.'}</p>
                </div>

                {/* Scope of Work */}
                {scope.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Scope of Work</h3>
                    <ul className="space-y-4">
                      {scope.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                          <span className="text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gallery */}
                {images.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Project Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image: string, index: number) => (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                          <Image
                            src={image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${image}`}
                            alt={`${project.name} - Image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                {/* Project Details Card */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Project Details</h3>
                  <dl className="space-y-4">
                    {project.client && (
                      <div>
                        <dt className="text-sm text-slate-500">Client</dt>
                        <dd className="font-medium text-slate-900">{project.client}</dd>
                      </div>
                    )}
                    {project.location && (
                      <div>
                        <dt className="text-sm text-slate-500">Location</dt>
                        <dd className="font-medium text-slate-900">{project.location}</dd>
                      </div>
                    )}
                    {project.capacity && (
                      <div>
                        <dt className="text-sm text-slate-500">Capacity</dt>
                        <dd className="font-medium text-slate-900">{project.capacity}</dd>
                      </div>
                    )}
                    {project.role && (
                      <div>
                        <dt className="text-sm text-slate-500">Our Role</dt>
                        <dd className="font-medium text-slate-900">{project.role}</dd>
                      </div>
                    )}
                    {project.startDate && (
                      <div>
                        <dt className="text-sm text-slate-500">Start Date</dt>
                        <dd className="font-medium text-slate-900">
                          {new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </dd>
                      </div>
                    )}
                    {project.completionDate && (
                      <div>
                        <dt className="text-sm text-slate-500">Completion Date</dt>
                        <dd className="font-medium text-slate-900">
                          {new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-slate-500">Status</dt>
                      <dd className={`font-medium ${
                        project.status === 'completed' ? 'text-green-600' : 
                        project.status === 'ongoing' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* CTA Card */}
                <div className="bg-slate-900 rounded-2xl p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">Interested in similar projects?</h3>
                  <p className="text-slate-400 text-sm mb-4">Let&apos;s discuss how we can help with your project</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    Contact Us
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
