import { Col, Layout, Row, Space, Typography } from 'antd';
import { pageCopy } from '@data';
import { NavBar } from './components/NavBar';
import { StatCards } from './components/StatCards';
import { CustomerTable } from './components/CustomerTable';
import { CustomerForm } from './components/CustomerForm';
import { ActionsPanel } from './components/ActionsPanel';
import { WorkspaceTabs } from './components/WorkspaceTabs';
import { FaqAccordion } from './components/FaqAccordion';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar />
      <Content style={{ padding: '32px 24px', maxWidth: 1400, width: '100%', margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={1} style={{ fontSize: '1.75rem', margin: 0 }}>
            {pageCopy.title}
          </Title>
          <Text type="secondary">{pageCopy.subtitle}</Text>
        </div>

        <Space orientation="vertical" size={24} style={{ width: '100%' }}>
          <StatCards />

          <CustomerTable />

          <Row gutter={[24, 24]}>
            <Col xs={24} md={14}>
              <CustomerForm />
            </Col>
            <Col xs={24} md={10}>
              <ActionsPanel />
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <WorkspaceTabs />
            </Col>
            <Col xs={24} md={12}>
              <FaqAccordion />
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
