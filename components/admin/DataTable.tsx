'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyAction?: { href: string; label: string };
  onDelete?: (id: number) => void;
  editHref?: (item: T) => string;
  isDeleting?: boolean;
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  isLoading,
  emptyMessage = 'No items found',
  emptyAction,
  onDelete,
  editHref,
  isDeleting,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-10 w-10 bg-neutral-100 rounded-lg animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse" />
                <div className="h-3 w-24 bg-neutral-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-neutral-400 text-xl">○</span>
        </div>
        <p className="text-neutral-500 mb-3">{emptyMessage}</p>
        {emptyAction && (
          <Link href={emptyAction.href} className="text-sm font-medium text-neutral-900 hover:underline">
            {emptyAction.label} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
            {(editHref || onDelete) && (
              <th className="text-right px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={`px-6 py-4 ${col.className || ''}`}>
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
              {(editHref || onDelete) && (
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1">
                    {editHref && (
                      <Link
                        href={editHref(item)}
                        className="px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this item?')) {
                            onDelete(item.id);
                          }
                        }}
                        disabled={isDeleting}
                        className="px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'info' | 'default';
}

const variantStyles = {
  success: 'bg-neutral-900 text-white',
  warning: 'bg-neutral-200 text-neutral-700',
  info: 'bg-neutral-100 text-neutral-600',
  default: 'bg-neutral-100 text-neutral-500',
};

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${variantStyles[variant]}`}>
      {status}
    </span>
  );
}

// Get status variant helper
export function getStatusVariant(status: string): StatusBadgeProps['variant'] {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'published':
      return 'success';
    case 'draft':
    case 'pending':
      return 'warning';
    case 'ongoing':
      return 'info';
    default:
      return 'default';
  }
}
