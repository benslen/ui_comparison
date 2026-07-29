import { Card, Col, Row, Space, Typography, theme } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  FallOutlined,
  FileTextOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { stats } from '@data';
import type { StatIcon } from '@data';

const { Text } = Typography;

const icons: Record<StatIcon, typeof DollarOutlined> = {
  revenue: DollarOutlined,
  customers: TeamOutlined,
  orders: FileTextOutlined,
  churn: FallOutlined,
};

export function StatCards() {
  const { token } = theme.useToken();

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const isGood = stat.invertGood ? stat.direction === 'down' : stat.direction === 'up';
        const TrendIcon = stat.direction === 'up' ? ArrowUpOutlined : ArrowDownOutlined;
        const color = isGood ? token.colorSuccess : token.colorError;
        const bg = isGood ? token.colorSuccessBg : token.colorErrorBg;

        return (
          <Col key={stat.id} xs={24} sm={12} lg={6}>
            <Card size="small" styles={{ body: { padding: 20 } }} style={{ height: '100%' }}>
              <Space align="start" size={12}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    display: 'grid',
                    placeItems: 'center',
                    background: token.colorFillTertiary,
                    color: token.colorPrimary,
                    fontSize: 18,
                  }}
                >
                  <Icon />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    {stat.label}
                  </Text>
                  <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>{stat.value}</div>
                </div>
              </Space>

              <Space size={8} style={{ marginTop: 12 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    padding: '2px 7px',
                    borderRadius: 6,
                    background: bg,
                    color,
                    fontSize: 12,
                    fontWeight: 650,
                  }}
                >
                  <TrendIcon style={{ fontSize: 11 }} />
                  {stat.delta}%
                </span>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {stat.caption}
                </Text>
              </Space>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
