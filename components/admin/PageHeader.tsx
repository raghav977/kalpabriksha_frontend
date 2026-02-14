'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  description?: string;
  backButton?: boolean;
  action?: ReactNode;
}

export function PageHeader({ title, description, backButton = false, action }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {backButton && (
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
          >
            ←
          </button>
        )}
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">{title}</h1>
          {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
