import { Card, Tabs, Typography, theme } from 'antd';
import { tabItems } from '@data';

const { Title, Text } = Typography;

export function WorkspaceTabs() {
  const { token } = theme.useToken();

  // Tabs are configured with an `items` array — no JSX children in antd v5+.
  const items = tabItems.map((tab) => ({
    key: tab.id,
    label: tab.label,
    children: (
      <div style={{ padding: '4px 20px 20px' }}>
        <Title level={2} style={{ fontSize: '1.125rem', marginTop: 0, marginBottom: 6 }}>
          {tab.heading}
        </Title>
        <Text type="secondary">{tab.body}</Text>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0' }}>
          {tab.bullets.map((bullet) => (
            <li
              key={bullet}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '3px 0' }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: token.colorPrimary,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 14 }}>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <Card style={{ height: '100%' }} styles={{ body: { padding: 0 } }}>
      <Tabs defaultActiveKey={tabItems[0].id} items={items} tabBarStyle={{ padding: '0 16px', marginBottom: 0 }} />
    </Card>
  );
}
