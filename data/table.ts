import type { Customer, InvoiceStatus } from './types';

/**
 * Sorting, pagination, and formatting live here rather than in each app so the
 * table behaves identically everywhere and the UI library stays the only
 * variable. Each app supplies its own presentation for the result.
 */

export type SortableColumn = 'name' | 'company' | 'plan' | 'status' | 'amount' | 'seats' | 'signedUp';
export type SortDirection = 'asc' | 'desc';

export interface TableColumn {
  id: SortableColumn | 'id';
  label: string;
  sortable: boolean;
  numeric: boolean;
}

export const tableColumns: TableColumn[] = [
  { id: 'id', label: 'Invoice', sortable: false, numeric: false },
  { id: 'name', label: 'Customer', sortable: true, numeric: false },
  { id: 'company', label: 'Company', sortable: true, numeric: false },
  { id: 'plan', label: 'Plan', sortable: true, numeric: false },
  { id: 'status', label: 'Status', sortable: true, numeric: false },
  { id: 'seats', label: 'Seats', sortable: true, numeric: true },
  { id: 'amount', label: 'Amount', sortable: true, numeric: true },
  { id: 'signedUp', label: 'Signed up', sortable: true, numeric: false },
];

export const pageSizeOptions = [5, 10, 25];
export const defaultPageSize = 5;

/** Plan ordering is by tier, not alphabetical — sorting by name would be useless. */
const planRank: Record<Customer['plan'], number> = {
  Starter: 0,
  Growth: 1,
  Scale: 2,
  Enterprise: 3,
};

const statusRank: Record<InvoiceStatus, number> = {
  draft: 0,
  pending: 1,
  paid: 2,
  overdue: 3,
};

function compare(a: Customer, b: Customer, column: SortableColumn): number {
  switch (column) {
    case 'amount':
      return a.amount - b.amount;
    case 'seats':
      return a.seats - b.seats;
    case 'plan':
      return planRank[a.plan] - planRank[b.plan];
    case 'status':
      return statusRank[a.status] - statusRank[b.status];
    case 'signedUp':
      return a.signedUp.localeCompare(b.signedUp);
    default:
      return a[column].localeCompare(b[column]);
  }
}

/**
 * Comparator for one column, for libraries whose table has built-in sorting
 * (Ant Design) and therefore wants a compare function rather than a sorted array.
 */
export function columnComparator(column: SortableColumn) {
  return (a: Customer, b: Customer) => compare(a, b, column);
}

export function sortCustomers(
  rows: Customer[],
  column: SortableColumn,
  direction: SortDirection,
): Customer[] {
  const sorted = [...rows].sort((a, b) => compare(a, b, column));
  return direction === 'asc' ? sorted : sorted.reverse();
}

export function paginate<T>(rows: T[], page: number, pageSize: number): T[] {
  return rows.slice(page * pageSize, page * pageSize + pageSize);
}

export function pageCount(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export function formatAmount(value: number): string {
  return currency.format(value);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Semantic tone per status; each app maps tones onto its own badge colours. */
export const statusTone: Record<InvoiceStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'danger',
  draft: 'neutral',
};

export const statusLabel: Record<InvoiceStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  draft: 'Draft',
};
