import React from 'react';

type PaginationProps = {
  page: number;
  pages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
};

export function Pagination({ page, pages, total, limit, onPageChange, onLimitChange }: PaginationProps) {
  if (pages <= 1) return null;

  const pageNumbers: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, page + 2);
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-neutral-600">
        Showing page {page} of {pages} — {total} total
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded border bg-white hover:bg-neutral-50"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Prev
          </button>

          {pageNumbers.map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${p === page ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-50'}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="px-2 py-1 rounded border bg-white hover:bg-neutral-50"
            disabled={page >= pages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>

        {onLimitChange && (
          <select
            value={limit}
            onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
            className="ml-3 border rounded px-2 py-1 text-sm"
          >
            {[10, 25, 50, 100].map((v) => (
              <option key={v} value={v}>
                {v}/page
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default Pagination;
