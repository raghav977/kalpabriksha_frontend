'use client';

import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { contactApi, ContactSubmission } from '@/lib/api';
import {
  PageHeader,
  StatusBadge,
  getStatusVariant,
  PageLoading,
  ErrorState,
  EmptyState,
  ConfirmModal,
} from '@/components/admin';
import { Mail, Phone, Eye, Trash2, MessageSquare, Users, Briefcase, HelpCircle, X } from 'lucide-react';

// Type labels and colors
const typeLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  partner: { label: 'Partner Inquiry', color: 'bg-purple-100 text-purple-700', icon: <Briefcase className="w-3 h-3" /> },
  consult: { label: 'Consultation', color: 'bg-blue-100 text-blue-700', icon: <MessageSquare className="w-3 h-3" /> },
  general: { label: 'General', color: 'bg-gray-100 text-gray-700', icon: <HelpCircle className="w-3 h-3" /> },
  career: { label: 'Career', color: 'bg-green-100 text-green-700', icon: <Users className="w-3 h-3" /> },
  team: { label: 'Team Contact', color: 'bg-yellow-100 text-yellow-700', icon: <Users className="w-3 h-3" /> },
};

export default function AdminMessagesPage() {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch submissions
  const { data, isLoading, error } = useQuery({
    queryKey: ['contact', 'submissions', { status: selectedStatus, type: selectedType }],
    queryFn: () => contactApi.getAll({ 
      status: selectedStatus || undefined, 
      type: selectedType || undefined,
      limit: 100 
    }),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => contactApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
      setDeleteId(null);
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'new' | 'read' | 'replied' | 'archived' }) => 
      contactApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });

  if (isLoading) return <PageLoading />;
  if (error) return <ErrorState message="Failed to load messages" />;

  const submissions = data?.submissions || [];

  // Count new messages
  const newCount = submissions.filter(s => s.status === 'new').length;

  return (
    <div>
      <PageHeader
        title={`Messages ${newCount > 0 ? `(${newCount} new)` : ''}`}
        description="View and manage contact form submissions"
      />

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Types</option>
          <option value="partner">Partner Inquiry</option>
          <option value="consult">Consultation</option>
          <option value="general">General</option>
          <option value="career">Career</option>
          <option value="team">Team Contact</option>
        </select>
      </div>

      {submissions.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Contact form submissions will appear here"
        />
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sender</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {submissions.map((sub) => {
                const typeInfo = typeLabels[sub.type] || typeLabels.general;
                return (
                  <tr key={sub.id} className={`hover:bg-neutral-50 ${sub.status === 'new' ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                        {typeInfo.icon}
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-neutral-900">{sub.name}</p>
                        <p className="text-sm text-neutral-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {sub.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <p className="font-medium text-neutral-900 truncate">{sub.subject}</p>
                        <p className="text-sm text-neutral-500 truncate">{sub.message.substring(0, 50)}...</p>
                        {sub.teamMemberName && (
                          <p className="text-xs text-yellow-600 mt-1">→ To: {sub.teamMemberName}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={sub.status} variant={getStatusVariant(sub.status)} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-neutral-500">
                        {new Date(sub.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedMessage(sub);
                            if (sub.status === 'new') {
                              updateStatusMutation.mutate({ id: sub.id, status: 'read' });
                            }
                          }}
                          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(sub.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {(() => {
                    const typeInfo = typeLabels[selectedMessage.type] || typeLabels.general;
                    return (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                        {typeInfo.icon}
                        {typeInfo.label}
                      </span>
                    );
                  })()}
                  <StatusBadge status={selectedMessage.status} variant={getStatusVariant(selectedMessage.status)} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">{selectedMessage.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Sender Info */}
              <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                <h4 className="text-sm font-medium text-neutral-500 mb-2">From</h4>
                <p className="font-medium text-neutral-900">{selectedMessage.name}</p>
                <p className="text-sm text-neutral-600 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${selectedMessage.email}`} className="hover:text-primary">
                    {selectedMessage.email}
                  </a>
                </p>
                {selectedMessage.phone && (
                  <p className="text-sm text-neutral-600 flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedMessage.phone}`} className="hover:text-primary">
                      {selectedMessage.phone}
                    </a>
                  </p>
                )}
                {selectedMessage.teamMemberName && (
                  <p className="text-sm text-yellow-700 mt-2 bg-yellow-50 px-2 py-1 rounded inline-block">
                    Directed to: {selectedMessage.teamMemberName}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-neutral-500 mb-2">Message</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-neutral-700">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Date */}
              <p className="text-sm text-neutral-400">
                Received: {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-100">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-neutral-800 transition-colors"
                  onClick={() => {
                    updateStatusMutation.mutate({ id: selectedMessage.id, status: 'replied' });
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
                <button
                  onClick={() => {
                    updateStatusMutation.mutate({ id: selectedMessage.id, status: 'archived' });
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2.5 border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
