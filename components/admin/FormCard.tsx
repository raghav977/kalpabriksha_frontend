'use client';

import { ReactNode } from 'react';

interface FormCardProps {
  children: ReactNode;
  className?: string;
  error?: string | null;
}

export function FormCard({ children, className = '', error }: FormCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-neutral-200 ${className}`}>
      {error && (
        <div className="m-6 mb-0 p-4 bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-900 text-sm">
          {error}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
