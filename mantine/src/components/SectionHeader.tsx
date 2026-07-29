import { Box, Text, Title } from '@mantine/core';

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box mb="xs">
      <Title order={2}>{title}</Title>
      <Text size="sm" c="dimmed">
        {subtitle}
      </Text>
    </Box>
  );
}
