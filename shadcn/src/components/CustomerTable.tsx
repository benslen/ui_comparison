import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsUpDown, ChevronDown, ChevronUp } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';

type Tone = (typeof statusTone)[keyof typeof statusTone];

const badgeVariant: Record<Tone, 'success' | 'warning' | 'destructive' | 'outline'> = {
  success: 'success',
  warning: 'warning',
  danger: 'destructive',
  neutral: 'outline',
};

/** shadcn's Table is markup only, so sorting and pagination are written here. */
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
    <Card>
      <div className="p-5 pb-3">
        <SectionHeader title={pageCopy.tableTitle} subtitle={pageCopy.tableSubtitle} />
      </div>

      <Table className="min-w-[860px]">
        <TableHeader>
          <TableRow>
            {tableColumns.map((column) => {
              const active = sortBy === column.id;
              const Icon = !active ? ChevronsUpDown : direction === 'asc' ? ChevronUp : ChevronDown;
              return (
                <TableHead key={column.id} className={cn(column.numeric && 'text-right')}>
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column.id as SortableColumn)}
                      className={cn(
                        'hover:text-foreground inline-flex items-center gap-1 transition-colors',
                        active && 'text-foreground',
                      )}
                    >
                      {column.label}
                      <Icon className="size-3.5" />
                    </button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="text-muted-foreground py-3 font-mono text-xs">{row.id}</TableCell>
              <TableCell className="py-3">
                <div className="font-semibold">{row.name}</div>
                <div className="text-muted-foreground text-xs">{row.email}</div>
              </TableCell>
              <TableCell className="py-3">{row.company}</TableCell>
              <TableCell className="py-3">{row.plan}</TableCell>
              <TableCell className="py-3">
                <Badge variant={badgeVariant[statusTone[row.status]]}>
                  {statusLabel[row.status]}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-right tabular-nums">{row.seats}</TableCell>
              <TableCell className="py-3 text-right font-semibold tabular-nums">
                {formatAmount(row.amount)}
              </TableCell>
              <TableCell className="text-muted-foreground py-3 whitespace-nowrap">
                {formatDate(row.signedUp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm whitespace-nowrap">Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPage(0);
            }}
          >
            <SelectTrigger className="h-8 w-[74px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            {from}–{to} of {sorted.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label="Previous page"
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          >
            <ChevronLeft />
          </Button>
          <span className="text-muted-foreground px-2 text-sm">
            Page {page + 1} of {total}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label="Next page"
            disabled={page >= total - 1}
            onClick={() => setPage((prev) => Math.min(total - 1, prev + 1))}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </Card>
  );
}
