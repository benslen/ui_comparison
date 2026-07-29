import { Typography } from 'antd';

const { Title, Text } = Typography;

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <Title level={2} style={{ fontSize: '1.125rem', margin: 0 }}>
        {title}
      </Title>
      <Text type="secondary" style={{ fontSize: 14 }}>
        {subtitle}
      </Text>
    </div>
  );
}
