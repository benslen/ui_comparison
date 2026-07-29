import { useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Card,
  Center,
  Group,
  Pagination,
  Select,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
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

const badgeColor: Record<Tone, string> = {
  success: 'teal',
  warning: 'orange',
  danger: 'red',
  neutral: 'gray',
};

/**
 * Mantine's Table is presentational only — no sorting, no pagination. The
 * sortable header button and the page wiring below are hand-rolled.
 */
function SortHeader({
  label,
  active,
  direction,
  numeric,
  onSort,
}: {
  label: string;
  active: boolean;
  direction: SortDirection;
  numeric: boolean;
  onSort: () => void;
}) {
  const Icon = !active ? IconSelector : direction === 'asc' ? IconChevronUp : IconChevronDown;
  return (
    <UnstyledButton onClick={onSort} w="100%">
      <Group gap={4} justify={numeric ? 'flex-end' : 'flex-start'} wrap="nowrap">
        <Text size="sm" fw={650} c={active ? undefined : 'dimmed'}>
          {label}
        </Text>
        <Center>
          <Icon size={14} stroke={2} />
        </Center>
      </Group>
    </UnstyledButton>
  );
}

export function CustomerTable() {
  const [sortBy, setSortBy] = useState<SortableColumn>('name');
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1); // Mantine's Pagination is 1-indexed
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const sorted = useMemo(() => sortCustomers(customers, sortBy, direction), [sortBy, direction]);
  const rows = useMemo(() => paginate(sorted, page - 1, pageSize), [sorted, page, pageSize]);
  const total = pageCount(sorted.length, pageSize);

  const handleSort = (column: SortableColumn) => {
    if (column === sortBy) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setDirection('asc');
    }
    setPage(1);
  };

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, sorted.length);

  return (
    <Card withBorder radius="md" padding={0}>
      <Box p="lg" pb="sm">
        <SectionHeader title={pageCopy.tableTitle} subtitle={pageCopy.tableSubtitle} />
      </Box>

      <Table.ScrollContainer minWidth={860}>
        <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="lg">
          <Table.Thead>
            <Table.Tr>
              {tableColumns.map((column) => (
                <Table.Th
                  key={column.id}
                  style={{ textAlign: column.numeric ? 'right' : 'left', whiteSpace: 'nowrap' }}
                >
                  {column.sortable ? (
                    <SortHeader
                      label={column.label}
                      active={sortBy === column.id}
                      direction={direction}
                      numeric={column.numeric}
                      onSort={() => handleSort(column.id as SortableColumn)}
                    />
                  ) : (
                    <Text size="sm" fw={650} c="dimmed">
                      {column.label}
                    </Text>
                  )}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((row) => (
              <Table.Tr key={row.id}>
                <Table.Td>
                  <Text size="sm" c="dimmed" ff="monospace">
                    {row.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {row.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {row.email}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{row.company}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{row.plan}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={badgeColor[statusTone[row.status]]}
                    variant={statusTone[row.status] === 'neutral' ? 'outline' : 'filled'}
                    radius="sm"
                  >
                    {statusLabel[row.status]}
                  </Badge>
                </Table.Td>
                <Table.Td ta="right">
                  <Text size="sm">{row.seats}</Text>
                </Table.Td>
                <Table.Td ta="right">
                  <Text size="sm" fw={600}>
                    {formatAmount(row.amount)}
                  </Text>
                </Table.Td>
                <Table.Td style={{ whiteSpace: 'nowrap' }}>
                  <Text size="sm" c="dimmed">
                    {formatDate(row.signedUp)}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Group justify="space-between" p="md" wrap="wrap" gap="sm">
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            Rows per page
          </Text>
          <Select
            size="xs"
            w={76}
            allowDeselect={false}
            value={String(pageSize)}
            data={pageSizeOptions.map(String)}
            onChange={(value) => {
              setPageSize(Number(value));
              setPage(1);
            }}
          />
          <Text size="sm" c="dimmed">
            {from}–{to} of {sorted.length}
          </Text>
        </Group>
        <Pagination value={page} onChange={setPage} total={total} size="sm" withEdges />
      </Group>
    </Card>
  );
}
