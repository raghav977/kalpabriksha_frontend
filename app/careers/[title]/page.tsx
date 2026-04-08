'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePublicCareerById } from '@/hooks/api/useCareers';
import { Layout } from '@/components/layout/Layout';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { MapPin, Clock, Briefcase, DollarSign, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CareerDetailPage() {
  const params = useParams();
  const slug = params?.title as string;
  
  // Extract ID from slug (format: "position-title-123")
  const careerIdMatch = slug?.match(/-(\d+)$/);
  const careerId = careerIdMatch ? parseInt(careerIdMatch[1], 10) : null;

  const { data: career, isLoading, isError } = usePublicCareerById(careerId || 0);

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

  if (isError || !career) {
    return (
      <Layout>
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Not Found</h1>
              <p className="text-gray-600 mb-8">Sorry, we couldn't find this career opportunity.</p>
              <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Careers
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const positionTitle = career.Position?.title || 'Position';
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'TBD';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="py-12 bg-linear-to-b from-slate-50 to-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <Link href="/careers" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-6 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to All Openings
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{positionTitle}</h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>{career.location || 'On-site'}</span>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600">
                  <Briefcase className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span className="capitalize">{career.employmentType || 'Full-time'}</span>
                </div>
                
                {career.salaryRange && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <DollarSign className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span>{career.salaryRange}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>{formatDate(career.closingDate)}</span>
                </div>
              </div>

              {career.isRemote && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Remote Available
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
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
                {career.description && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Role</h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{career.description}</p>
                  </div>
                )}

                {/* Responsibilities */}
                {career.responsibilities && career.responsibilities.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Responsibilities</h2>
                    <ul className="space-y-3">
                      {career.responsibilities.map((responsibility: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-semibold">
                            {idx + 1}
                          </span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {career.requirements && career.requirements.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
                    <ul className="space-y-3">
                      {career.requirements.map((requirement: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600">
                          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
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
                <div className="sticky top-20 space-y-6">
                  {/* Application Card */}
                  <div className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Ready to Apply?</h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Submit your application and showcase why you're the perfect fit for this role.
                    </p>
                    <Link
                      href={`/careers?position=${encodeURIComponent(positionTitle)}`}
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Quick Info Card */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Salary Range</p>
                      <p className="text-lg font-bold text-slate-900">{career.salaryRange || 'Competitive'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Employment Type</p>
                      <p className="text-lg font-bold text-slate-900 capitalize">{career.employmentType || 'Full-time'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Closing Date</p>
                      <p className="text-lg font-bold text-slate-900">{formatDate(career.closingDate)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in This Opportunity?</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join our team and be part of something bigger. Apply now and let's build the future together.
            </p>
            <Link
              href={`/careers?position=${encodeURIComponent(positionTitle)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}