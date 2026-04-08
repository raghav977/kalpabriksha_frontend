"use client"

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    PageHeader,
    PageLoading,
    FormCard,
    DataTable,
    ErrorState,
} from '@/components/admin';
import { useCareersList, useDeleteCareer } from '@/hooks/api/useCareers';
import { usePositions } from '@/hooks/api/usePositions';
import { careersApi } from '@/lib/api';

type CareerItem = any;

export default function CareersAdminPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [activeOnly, setActiveOnly] = useState(false);

    // debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    const { data, isLoading, error } = useCareersList({
        page,
        limit,
        search: debouncedSearch || undefined,
        active: activeOnly,
    });
    console.log("This is data",data)

    const deleteMutation = useDeleteCareer();

    // fetch positions to display human-friendly titles
    const { data: positions = [] } = usePositions();
    const positionsMap = useMemo(() => {
        const m: Record<number, string> = {};
        (positions as any[]).forEach((p) => {
            if (p?.id != null) m[p.id] = p.title || String(p.id);
        });
        return m;
    }, [positions]);

    const columns = useMemo(() => [
        {
            key: 'positionId',
            header: 'Position ID',
            render: (c: CareerItem) => <span className="font-medium">{positionsMap?.[c.positionId] ?? c.positionId ?? '-'}</span>,
        },
        {
            key: 'salaryRange',
            header: 'Salary',
            render: (c: CareerItem) => <span className="text-sm text-neutral-600">{c.salaryRange || '-'}</span>,
        },
        {
            key: 'employmentType',
            header: 'Type',
            render: (c: CareerItem) => <span className="text-sm">{c.employmentType || '-'}</span>,
        },
        {
            key: 'location',
            header: 'Location',
            render: (c: CareerItem) => <span className="text-sm">{c.location || '-'}</span>,
        },
        {
            key: 'isRemote',
            header: 'Remote',
            render: (c: CareerItem) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.isRemote ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {c.isRemote ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: 'isActive',
            header: 'Active',
            render: (c: CareerItem) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {c.isActive ? 'Active' : 'Inactive'}
                </span>
            ),
        },
    ], [positionsMap]);

    if (isLoading) return <PageLoading />;

    if (error) {
        return (
            <div>
                <PageHeader title="Error" description="Failed to load career opportunities" />
                <ErrorState message="Failed to load career opportunities. Please try again later." />
            </div>
        );
    }


    const payload = data as any;
    const items: CareerItem[] = payload?.careers ?? payload?.submissions ?? [];
    console.log("This is items",items)
    const pagination = payload?.pagination ?? { total: 0, page: 1, limit, pages: 1 };

    return (
        <div>
            <PageHeader
                title="Careers"
                description="Manage your career opportunities"
                action={
                    <Link href="/admin/careers/new" className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
                        + New Career Vacancy
                    </Link>
                }
            />

            <FormCard>
                <div className="mb-4 flex gap-3 items-center">
                    <input
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Search careers..."
                        className="border rounded px-3 py-2 text-sm w-64"
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={activeOnly} onChange={(e) => { setActiveOnly(e.target.checked); setPage(1); }} />
                        Active
                    </label>
                </div>

                <DataTable
                    data={items}
                    columns={columns}
                    isLoading={isLoading}
                    emptyMessage="No career submissions"
                    emptyAction={{ href: '/admin/careers/new', label: 'Create a vacancy' }}
                    editHref={(c: any) => `/admin/careers/${c.id}/`}
                      onDelete={(id: number) => deleteMutation.mutate(id)}
                      isDeleting={deleteMutation.isPending}
                    pagination={{
                        page: pagination.page,
                        pages: pagination.pages ?? pagination.totalPages ?? 1,
                        total: pagination.total ?? 0,
                        limit: pagination.limit ?? limit,
                        onPageChange: setPage,
                        onLimitChange: (l: number) => {
                            setLimit(l);
                            setPage(1);
                        },
                    }}
                />
            </FormCard>
        </div>
    );
}