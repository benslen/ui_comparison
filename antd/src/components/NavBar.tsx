import { Avatar, Button, Dropdown, Layout, Space, Tooltip, Typography, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  BulbOutlined,
  FundOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { appName, avatarMenu, currentUser, navLinks } from '@data';
import { useColorMode } from '../ThemeContext';

const { Header } = Layout;
const { Text } = Typography;

export function NavBar() {
  const { isDark, toggle } = useColorMode();
  const { token } = theme.useToken();

  // antd menus are data-driven: items are a config array, not JSX children.
  const items: MenuProps['items'] = [
    {
      key: 'header',
      type: 'group',
      label: (
        <div style={{ padding: '4px 0' }}>
          <div style={{ fontWeight: 650, color: token.colorText }}>{currentUser.name}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {currentUser.email}
          </Text>
        </div>
      ),
    },
    ...avatarMenu.flatMap<NonNullable<MenuProps['items']>[number]>((item) => [
      ...(item.dividerBefore ? [{ type: 'divider' as const, key: `${item.id}-divider` }] : []),
      { key: item.id, label: item.label, danger: item.danger },
    ]),
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Space size={10} style={{ marginRight: 24 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            display: 'grid',
            placeItems: 'center',
            background: token.colorPrimary,
            color: '#fff',
          }}
        >
          <FundOutlined style={{ fontSize: 17 }} />
        </div>
        <Text strong style={{ fontSize: 16 }}>
          {appName}
        </Text>
      </Space>

      <Space size="large">
        {navLinks.map((link, index) => (
          <a
            key={link.id}
            href={link.href}
            style={{
              fontSize: 14,
              fontWeight: index === 0 ? 700 : 500,
              color: index === 0 ? token.colorPrimary : token.colorTextSecondary,
            }}
          >
            {link.label}
          </a>
        ))}
      </Space>

      <div style={{ flex: 1 }} />

      <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
        <Button
          type="text"
          aria-label="Toggle color mode"
          icon={isDark ? <BulbOutlined /> : <MoonOutlined />}
          onClick={toggle}
        />
      </Tooltip>

      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <Avatar
          size={34}
          style={{ backgroundColor: token.colorPrimary, cursor: 'pointer', marginLeft: 4 }}
        >
          {currentUser.initials}
        </Avatar>
      </Dropdown>
    </Header>
  );
}
