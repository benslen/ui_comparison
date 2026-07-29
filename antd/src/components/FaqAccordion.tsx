import { Card, Collapse, Typography } from 'antd';
import { accordionItems, pageCopy } from '@data';
import { SectionHeader } from './SectionHeader';

const { Text } = Typography;

export function FaqAccordion() {
  const items = accordionItems.map((item) => ({
    key: item.id,
    label: <span style={{ fontWeight: 600, fontSize: 14 }}>{item.question}</span>,
    children: (
      <Text type="secondary" style={{ fontSize: 14 }}>
        {item.answer}
      </Text>
    ),
  }));

  return (
    <Card style={{ height: '100%' }} styles={{ body: { padding: 0 } }}>
      <div style={{ padding: '20px 20px 8px' }}>
        <SectionHeader
          title={pageCopy.accordionTitle}
          subtitle="Common billing and access questions."
        />
      </div>
      <div style={{ padding: '0 12px 16px' }}>
        <Collapse
          items={items}
          defaultActiveKey={[accordionItems[0].id]}
          accordion
          ghost
          expandIconPlacement="end"
        />
      </div>
    </Card>
  );
}
