import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import {
  customers,
  defaultPageSize,
  formatAmount,
  formatDate,
  pageSizeOptions,
  paginate,
  sortCustomers,
  statusLabel,
  statusTone,
  tableColumns,
} from '@data';
import { pageCopy } from '@data';
import type { SortDirection, SortableColumn } from '@data';
import { SectionHeader } from './SectionHeader';

type Tone = (typeof statusTone)[keyof typeof statusTone];

const chipColor: Record<Tone, 'success' | 'warning' | 'error' | 'default'> = {
  success: 'success',
  warning: 'warning',
  danger: 'error',
  neutral: 'default',
};

export function CustomerTable() {
  const [sortBy, setSortBy] = useState<SortableColumn>('name');
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const sorted = useMemo(() => sortCustomers(customers, sortBy, direction), [sortBy, direction]);
  const rows = useMemo(() => paginate(sorted, page, pageSize), [sorted, page, pageSize]);

  const handleSort = (column: SortableColumn) => {
    if (column === sortBy) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setDirection('asc');
    }
    setPage(0);
  };

  return (
    <Card>
      <Box sx={{ p: 2.5, pb: 1.5 }}>
        <SectionHeader title={pageCopy.tableTitle} subtitle={pageCopy.tableSubtitle} />
      </Box>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 860 }}>
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? 'right' : 'left'}
                  sortDirection={sortBy === column.id ? direction : false}
                  sx={{ fontWeight: 650, whiteSpace: 'nowrap', color: 'text.secondary' }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? direction : 'asc'}
                      onClick={() => handleSort(column.id as SortableColumn)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontVariantNumeric: 'tabular-nums', color: 'text.secondary' }}>
                  {row.id}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {row.email}
                  </Typography>
                </TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={statusLabel[row.status]}
                    color={chipColor[statusTone[row.status]]}
                    variant={statusTone[row.status] === 'neutral' ? 'outlined' : 'filled'}
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {row.seats}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}
                >
                  {formatAmount(row.amount)}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                  {formatDate(row.signedUp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(_event, next) => setPage(next)}
        rowsPerPage={pageSize}
        rowsPerPageOptions={pageSizeOptions}
        onRowsPerPageChange={(event) => {
          setPageSize(Number(event.target.value));
          setPage(0);
        }}
      />
    </Card>
  );
}
