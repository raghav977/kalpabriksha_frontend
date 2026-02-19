'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Facebook, Twitter, Send, X } from 'lucide-react';
import { useTeamMembers } from '@/hooks/api';
import { useContactTeamMember } from '@/hooks/api/useContact';
import { TeamMember } from '@/lib/api';

// Contact Modal Component
function ContactModal({ 
  member, 
  isOpen, 
  onClose 
}: { 
  member: TeamMember; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const contactMutation = useContactTeamMember();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await contactMutation.mutateAsync({
        teamMemberId: member.id,
        formData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject,
          message: formData.message
        }
      });
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Contact {member.name}</h3>
            <p className="text-sm text-slate-500">{member.position}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h4>
              <p className="text-slate-600">
                Your message has been sent to {member.name}. They will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  placeholder="+977-98XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                  placeholder="Regarding..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none"
                  placeholder="Your message to the team member..."
                />
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {contactMutation.isPending ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Team Member Card Component
function TeamMemberCard({ member }: { member: TeamMember }) {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-64 bg-slate-200 overflow-hidden">
          {member.image ? (
            <Image
              src={member.image.startsWith('http') ? member.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${member.image}`}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-700 to-slate-900">
              <span className="text-6xl font-bold text-white/30">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Social overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              {member.linkedin && (
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              )}
              {member.facebook && (
                <a 
                  href={member.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              )}
              {member.twitter && (
                <a 
                  href={member.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
          <p className="text-yellow-600 font-medium text-sm mb-3">{member.position}</p>
          
          {member.department && (
            <span className="inline-block bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full mb-4">
              {member.department}
            </span>
          )}
          
          {member.bio && (
            <p className="text-slate-600 text-sm line-clamp-3 mb-4">
              {member.bio}
            </p>
          )}

          {/* Contact Info */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            {member.email && (
              <a 
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-yellow-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {member.email}
              </a>
            )}
            {member.phone && (
              <a 
                href={`tel:${member.phone}`}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-yellow-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {member.phone}
              </a>
            )}
          </div>

          {/* Contact Button */}
          <button
            onClick={() => setShowContactModal(true)}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </div>

      <ContactModal 
        member={member} 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
}

export function TeamList() {
  const { data: members, isLoading } = useTeamMembers({ active: true });

  // Group members by department
  const groupedMembers = members?.reduce((acc, member) => {
    const dept = member.department || 'Leadership';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          // Loading skeleton
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : groupedMembers && Object.keys(groupedMembers).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedMembers).map(([department, deptMembers]) => (
              <div key={department}>
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{department}</h2>
                  <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4" />
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {deptMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No team members found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
