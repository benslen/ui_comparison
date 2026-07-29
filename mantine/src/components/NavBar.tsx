import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  Text,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconChartHistogram, IconMoon, IconSun } from '@tabler/icons-react';
import { appName, avatarMenu, currentUser, navLinks } from '@data';

export function NavBar() {
  const { setColorScheme } = useMantineColorScheme();
  // `useComputedColorScheme` resolves 'auto' to a concrete value, which is what
  // the toggle needs — `colorScheme` alone can be 'auto' and flip the wrong way.
  const computed = useComputedColorScheme('light');
  const isDark = computed === 'dark';

  return (
    <Box
      component="header"
      pos="sticky"
      top={0}
      style={(t) => ({
        zIndex: 200,
        backgroundColor: 'var(--mantine-color-body)',
        borderBottom: `1px solid ${
          isDark ? t.colors.dark[4] : t.colors.gray[3]
        }`,
      })}
    >
      <Group h={60} px="md" gap="xs" wrap="nowrap">
        <Group gap={10} mr="lg" wrap="nowrap">
          <Box
            w={32}
            h={32}
            style={{
              display: 'grid',
              placeItems: 'center',
              borderRadius: 8,
              background: 'var(--mantine-color-indigo-6)',
              color: 'white',
            }}
          >
            <IconChartHistogram size={18} />
          </Box>
          <Text fw={700}>{appName}</Text>
        </Group>

        <Group gap="lg" visibleFrom="md">
          {navLinks.map((link, index) => (
            <Anchor
              key={link.id}
              href={link.href}
              size="sm"
              fw={index === 0 ? 700 : 500}
              c={index === 0 ? 'indigo' : 'dimmed'}
              underline="never"
            >
              {link.label}
            </Anchor>
          ))}
        </Group>

        <Box style={{ flex: 1 }} />

        <Tooltip label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            aria-label="Toggle color mode"
            onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Tooltip>

        <Menu shadow="md" width={232} position="bottom-end">
          <Menu.Target>
            <Avatar color="indigo" radius="xl" size={34} style={{ cursor: 'pointer' }}>
              {currentUser.initials}
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Box px="sm" py={6}>
              <Text size="sm" fw={650}>
                {currentUser.name}
              </Text>
              <Text size="xs" c="dimmed">
                {currentUser.email}
              </Text>
            </Box>
            {avatarMenu.map((item) => (
              <Box key={item.id}>
                {item.dividerBefore && <Divider my={4} />}
                <Menu.Item c={item.danger ? 'red' : undefined}>{item.label}</Menu.Item>
              </Box>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Box>
  );
}
