import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp } from 'lucide-react';
import {
  customers,
  defaultPageSize,
  formatAmount,
  formatDate,
  pageCopy,
  pageCount,
  pageSizeOptions,
  paginate,
  sortCustomers,
  statusLabel,
  statusTone,
  tableColumns,
} from '@data';
import type { SortDirection, SortableColumn } from '@data';
import { SectionHeader } from './SectionHeader';

type Tone = (typeof statusTone)[keyof typeof statusTone];

const badgeClass: Record<Tone, string> = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-error',
  neutral: 'badge-ghost',
};

/** daisyUI's `table` is a CSS skin — sorting and pagination are written here. */
export function CustomerTable() {
  const [sortBy, setSortBy] = useState<SortableColumn>('name');
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const sorted = useMemo(() => sortCustomers(customers, sortBy, direction), [sortBy, direction]);
  const rows = useMemo(() => paginate(sorted, page, pageSize), [sorted, page, pageSize]);
  const total = pageCount(sorted.length, pageSize);

  const handleSort = (column: SortableColumn) => {
    if (column === sortBy) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setDirection('asc');
    }
    setPage(0);
  };

  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, sorted.length);

  return (
    <div className="card bg-base-100 border-base-300 border">
      <div className="p-5 pb-3">
        <SectionHeader title={pageCopy.tableTitle} subtitle={pageCopy.tableSubtitle} />
      </div>

      <div className="overflow-x-auto">
        <table className="table-sm table min-w-[860px]">
          <thead>
            <tr>
              {tableColumns.map((column) => {
                const active = sortBy === column.id;
                const Icon = !active ? ChevronsUpDown : direction === 'asc' ? ChevronUp : ChevronDown;
                return (
                  <th key={column.id} className={column.numeric ? 'text-right' : ''}>
                    {column.sortable ? (
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1 ${
                          active ? 'text-base-content' : ''
                        } hover:text-base-content`}
                        onClick={() => handleSort(column.id as SortableColumn)}
                      >
                        {column.label}
                        <Icon className="size-3.5" />
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-base-200/60">
                <td className="text-base-content/60 font-mono text-xs">{row.id}</td>
                <td>
                  <div className="font-semibold">{row.name}</div>
                  <div className="text-base-content/60 text-xs">{row.email}</div>
                </td>
                <td>{row.company}</td>
                <td>{row.plan}</td>
                <td>
                  <span className={`badge badge-sm font-semibold ${badgeClass[statusTone[row.status]]}`}>
                    {statusLabel[row.status]}
                  </span>
                </td>
                <td className="text-right tabular-nums">{row.seats}</td>
                <td className="text-right font-semibold tabular-nums">{formatAmount(row.amount)}</td>
                <td className="text-base-content/60 whitespace-nowrap">{formatDate(row.signedUp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2">
          <span className="text-base-content/60 text-sm whitespace-nowrap">Rows per page</span>
          <select
            className="select select-xs w-[72px]"
            value={pageSize}
            aria-label="Rows per page"
            onChange={(event) => {
              setPageSize(Number(event.currentTarget.value));
              setPage(0);
            }}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-base-content/60 text-sm whitespace-nowrap">
            {from}–{to} of {sorted.length}
          </span>
        </div>

        <div className="join">
          <button
            type="button"
            className="btn btn-sm join-item"
            aria-label="Previous page"
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" className="btn btn-sm join-item pointer-events-none">
            Page {page + 1} of {total}
          </button>
          <button
            type="button"
            className="btn btn-sm join-item"
            aria-label="Next page"
            disabled={page >= total - 1}
            onClick={() => setPage((prev) => Math.min(total - 1, prev + 1))}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
