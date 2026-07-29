import { Box, Card, Group, SimpleGrid, Text } from '@mantine/core';
import {
  IconArrowDown,
  IconArrowUp,
  IconCoin,
  IconFileInvoice,
  IconTrendingDown,
  IconUsersGroup,
} from '@tabler/icons-react';
import { stats } from '@data';
import type { StatIcon } from '@data';

const icons: Record<StatIcon, typeof IconCoin> = {
  revenue: IconCoin,
  customers: IconUsersGroup,
  orders: IconFileInvoice,
  churn: IconTrendingDown,
};

export function StatCards() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const isGood = stat.invertGood ? stat.direction === 'down' : stat.direction === 'up';
        const TrendIcon = stat.direction === 'up' ? IconArrowUp : IconArrowDown;
        const tone = isGood ? 'teal' : 'red';

        return (
          <Card key={stat.id} withBorder padding="lg" radius="md">
            <Group gap="sm" wrap="nowrap" align="flex-start">
              <Box
                w={40}
                h={40}
                style={{
                  flexShrink: 0,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 10,
                  background: 'var(--mantine-color-default-hover)',
                  color: 'var(--mantine-color-indigo-6)',
                }}
              >
                <Icon size={20} />
              </Box>
              <Box style={{ minWidth: 0 }}>
                <Text size="sm" c="dimmed" truncate>
                  {stat.label}
                </Text>
                <Text fz={26} fw={700} lh={1.2}>
                  {stat.value}
                </Text>
              </Box>
            </Group>

            <Group gap={8} mt="sm">
              <Group
                gap={2}
                px={7}
                py={2}
                style={{
                  borderRadius: 6,
                  background: `var(--mantine-color-${tone}-light)`,
                  color: `var(--mantine-color-${tone}-light-color)`,
                }}
              >
                <TrendIcon size={13} stroke={2.5} />
                <Text size="xs" fw={650} inherit>
                  {stat.delta}%
                </Text>
              </Group>
              <Text size="xs" c="dimmed">
                {stat.caption}
              </Text>
            </Group>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
