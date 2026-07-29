import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  HStack,
  IconButton,
  NativeSelect,
  Pagination,
  Table,
  Text,
} from '@chakra-ui/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp } from 'lucide-react';
import {
  customers,
  defaultPageSize,
  formatAmount,
  formatDate,
  pageCopy,
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

const badgePalette: Record<Tone, string> = {
  success: 'green',
  warning: 'orange',
  danger: 'red',
  neutral: 'gray',
};

export function CustomerTable() {
  const [sortBy, setSortBy] = useState<SortableColumn>('name');
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const sorted = useMemo(() => sortCustomers(customers, sortBy, direction), [sortBy, direction]);
  const rows = useMemo(() => paginate(sorted, page - 1, pageSize), [sorted, page, pageSize]);

  const handleSort = (column: SortableColumn) => {
    if (column === sortBy) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setDirection('asc');
    }
    setPage(1);
  };

  return (
    <Card.Root variant="outline">
      <Box p="5" pb="3">
        <SectionHeader title={pageCopy.tableTitle} subtitle={pageCopy.tableSubtitle} />
      </Box>

      <Table.ScrollArea>
        <Table.Root size="sm" interactive minW="860px">
          <Table.Header>
            <Table.Row>
              {tableColumns.map((column) => {
                const active = sortBy === column.id;
                const Icon = !active ? ChevronsUpDown : direction === 'asc' ? ChevronUp : ChevronDown;
                return (
                  <Table.ColumnHeader
                    key={column.id}
                    textAlign={column.numeric ? 'end' : 'start'}
                    whiteSpace="nowrap"
                    color="fg.muted"
                    cursor={column.sortable ? 'pointer' : undefined}
                    onClick={
                      column.sortable ? () => handleSort(column.id as SortableColumn) : undefined
                    }
                    userSelect="none"
                  >
                    <HStack gap="1" justify={column.numeric ? 'flex-end' : 'flex-start'}>
                      <Text fontSize="sm" fontWeight="semibold">
                        {column.label}
                      </Text>
                      {column.sortable && <Icon size={13} />}
                    </HStack>
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell color="fg.muted" fontFamily="mono" fontSize="xs">
                  {row.id}
                </Table.Cell>
                <Table.Cell>
                  <Text fontSize="sm" fontWeight="semibold">
                    {row.name}
                  </Text>
                  <Text fontSize="xs" color="fg.muted">
                    {row.email}
                  </Text>
                </Table.Cell>
                <Table.Cell>{row.company}</Table.Cell>
                <Table.Cell>{row.plan}</Table.Cell>
                <Table.Cell>
                  <Badge
                    colorPalette={badgePalette[statusTone[row.status]]}
                    variant={statusTone[row.status] === 'neutral' ? 'outline' : 'solid'}
                  >
                    {statusLabel[row.status]}
                  </Badge>
                </Table.Cell>
                <Table.Cell textAlign="end">{row.seats}</Table.Cell>
                <Table.Cell textAlign="end" fontWeight="semibold">
                  {formatAmount(row.amount)}
                </Table.Cell>
                <Table.Cell whiteSpace="nowrap" color="fg.muted">
                  {formatDate(row.signedUp)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <HStack justify="space-between" p="4" wrap="wrap" gap="3">
        <HStack gap="2">
          <Text fontSize="sm" color="fg.muted" whiteSpace="nowrap">
            Rows per page
          </Text>
          <NativeSelect.Root size="xs" width="70px">
            <NativeSelect.Field
              value={String(pageSize)}
              onChange={(event) => {
                setPageSize(Number(event.currentTarget.value));
                setPage(1);
              }}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </HStack>

        <Pagination.Root
          count={sorted.length}
          pageSize={pageSize}
          page={page}
          onPageChange={(details) => setPage(details.page)}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton aria-label="Previous page">
                <ChevronLeft size={16} />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.PageText format="long" />
            <Pagination.NextTrigger asChild>
              <IconButton aria-label="Next page">
                <ChevronRight size={16} />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </HStack>
    </Card.Root>
  );
}
