import { Card, Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import {
  columnComparator,
  customers,
  defaultPageSize,
  formatAmount,
  formatDate,
  pageCopy,
  pageSizeOptions,
  statusLabel,
  statusTone,
  tableColumns,
} from '@data';
import type { Customer, SortableColumn } from '@data';
import { SectionHeader } from './SectionHeader';

const { Text } = Typography;

type Tone = (typeof statusTone)[keyof typeof statusTone];

const tagColor: Record<Tone, string> = {
  success: 'success',
  warning: 'warning',
  danger: 'error',
  neutral: 'default',
};

/**
 * Ant Design is the only library here whose Table does sorting and pagination
 * out of the box — columns declare a `sorter` and the rest is handled.
 */
export function CustomerTable() {
  const columns: TableProps<Customer>['columns'] = tableColumns.map((column) => {
    const base = {
      key: column.id,
      dataIndex: column.id,
      title: column.label,
      align: column.numeric ? ('right' as const) : ('left' as const),
      sorter: column.sortable ? columnComparator(column.id as SortableColumn) : undefined,
      showSorterTooltip: false,
    };

    switch (column.id) {
      case 'id':
        return {
          ...base,
          render: (value: string) => (
            <Text type="secondary" style={{ fontSize: 12, fontFamily: 'monospace' }}>
              {value}
            </Text>
          ),
        };
      case 'name':
        return {
          ...base,
          render: (_value: string, row: Customer) => (
            <div>
              <div style={{ fontWeight: 600 }}>{row.name}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {row.email}
              </Text>
            </div>
          ),
        };
      case 'status':
        return {
          ...base,
          render: (_value: string, row: Customer) => (
            <Tag color={tagColor[statusTone[row.status]]} style={{ fontWeight: 600, margin: 0 }}>
              {statusLabel[row.status]}
            </Tag>
          ),
        };
      case 'amount':
        return {
          ...base,
          render: (value: number) => <span style={{ fontWeight: 600 }}>{formatAmount(value)}</span>,
        };
      case 'signedUp':
        return {
          ...base,
          render: (value: string) => (
            <Text type="secondary" style={{ whiteSpace: 'nowrap' }}>
              {formatDate(value)}
            </Text>
          ),
        };
      default:
        return base;
    }
  });

  return (
    <Card styles={{ body: { padding: 0 } }}>
      <div style={{ padding: '20px 20px 12px' }}>
        <SectionHeader title={pageCopy.tableTitle} subtitle={pageCopy.tableSubtitle} />
      </div>
      <Table<Customer>
        rowKey="id"
        size="middle"
        columns={columns}
        dataSource={customers}
        scroll={{ x: 860 }}
        pagination={{
          defaultPageSize,
          pageSizeOptions,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
          style: { padding: '0 20px', marginBottom: 16 },
        }}
      />
    </Card>
  );
}
