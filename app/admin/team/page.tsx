'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTeamMembers } from '@/hooks/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi, TeamMember } from '@/lib/api';
import { useState } from 'react';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  PageLoading,
  ErrorState,
  EmptyState,
  ConfirmModal,
} from '@/components/admin';

export default function TeamPage() {
  const { data: members, isLoading, error } = useTeamMembers();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => teamApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      setDeleteId(null);
    },
  });

  if (isLoading) return <PageLoading />;
  if (error) return <ErrorState message="Failed to load team members" />;

  const columns = [
    {
      key: 'image',
      header: '',
      className: 'w-16',
      render: (member: TeamMember) => (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm font-medium">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      render: (member: TeamMember) => (
        <div>
          <p className="font-medium text-neutral-900">{member.name}</p>
          <p className="text-sm text-neutral-500">{member.email}</p>
        </div>
      ),
    },
    {
      key: 'position',
      header: 'Position',
      render: (member: TeamMember) => (
        <div>
          <p className="text-neutral-900">{member.position}</p>
          {member.department && (
            <p className="text-sm text-neutral-500">{member.department}</p>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (member: TeamMember) => (
        <StatusBadge
          status={member.isActive ? 'Active' : 'Inactive'}
          variant={member.isActive ? 'success' : 'default'}
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Team Members"
        description="Manage your organization's team members"
        action={
          <Link
            href="/admin/team/new"
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
          >
            + Add Member
          </Link>
        }
      />

      {members && members.length > 0 ? (
        <DataTable
          data={members}
          columns={columns}
          editHref={(member) => `/admin/team/${member.id}`}
          onDelete={(id) => setDeleteId(id)}
        />
      ) : (
        <EmptyState
          title="No team members"
          description="Start by adding your first team member"
          action={{ href: '/admin/team/new', label: '+ Add Member' }}
        />
      )}

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
