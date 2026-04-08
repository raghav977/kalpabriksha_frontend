'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePublicEventById } from '@/hooks/api/useEvents';
import { Layout } from '@/components/layout/Layout';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { Calendar, MapPin, FileText, Download, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const eventId = parseInt(id, 10);

  const { data: event, isLoading, isError } = usePublicEventById(eventId);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  if (isError || !event) {
    return (
      <Layout>
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
              <p className="text-gray-600 mb-8">Sorry, we couldn't find this event.</p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return 'TBD';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const images = event.images || [];
  const files = event.files || [];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="py-12 bg-linear-to-b from-slate-50 to-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 mb-6 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Events
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{event.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="w-5 h-5 text-gray-600 shrink-0" />
                  <span className="text-lg">{formatDate(event.date)}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-5 h-5 text-gray-600 shrink-0" />
                  <span className="text-lg">{event.location}</span>
                </div>
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
                className="lg:col-span-2 space-y-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Description */}
                {event.description && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Event</h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                      {event.description}
                    </p>
                  </div>
                )}

                {/* Gallery */}
                {images.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <ImageIcon className="w-6 h-6 text-gray-600" />
                      Event Gallery
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(image.url)}
                          className="relative group overflow-hidden rounded-xl h-40 md:h-48 bg-slate-200 hover:shadow-lg transition-all"
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image.url}`}
                            alt={`${event.title} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents */}
                {files.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-gray-600" />
                      Event Documents
                    </h2>
                    <div className="space-y-3">
                      {files.map((file: any, idx: number) => (
                        <a
                          key={idx}
                          href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${file.url}`}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-gray-300 transition-all group"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <FileText className="w-5 h-5 text-gray-600 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-slate-900 truncate">
                                {file.filename || `Document ${idx + 1}`}
                              </p>
                              {file.fileType && (
                                <p className="text-sm text-slate-500">{file.fileType}</p>
                              )}
                            </div>
                          </div>
                          <Download className="w-5 h-5 text-slate-400 group-hover:text-gray-600 transition-colors shrink-0 ml-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Event Info Card */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 p-8 sticky top-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Event Details</h3>

                  <div className="space-y-6">
                    {/* Date */}
                    <div>
                      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                        Date
                      </p>
                      <div className="flex items-center gap-3 text-slate-900 font-medium">
                        <Calendar className="w-5 h-5 text-gray-600 shrink-0" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                        Location
                      </p>
                      <div className="flex items-center gap-3 text-slate-900 font-medium">
                        <MapPin className="w-5 h-5 text-gray-600 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Images Count */}
                    {images.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                          Gallery
                        </p>
                        <div className="flex items-center gap-3 text-slate-900 font-medium">
                          <ImageIcon className="w-5 h-5 text-gray-600 shrink-0" />
                          <span>{images.length} image{images.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    )}

                    {/* Documents Count */}
                    {files.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
                          Documents
                        </p>
                        <div className="flex items-center gap-3 text-slate-900 font-medium">
                          <FileText className="w-5 h-5 text-gray-600 shrink-0" />
                          <span>{files.length} file{files.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={() => window.history.back()}
                    className="w-full mt-8 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white font-semibold rounded-xl transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedImage}`}
              alt="Event"
              className="w-full h-full object-contain rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
            >
              <span className="text-2xl text-black">&times;</span>
            </button>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
