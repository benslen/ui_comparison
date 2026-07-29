import { Box, Card, Group, List, Tabs, Text, Title } from '@mantine/core';
import { tabItems } from '@data';

export function WorkspaceTabs() {
  return (
    <Card withBorder radius="md" padding={0} h="100%">
      <Tabs defaultValue={tabItems[0].id}>
        <Tabs.List>
          {tabItems.map((tab) => (
            <Tabs.Tab key={tab.id} value={tab.id} fw={600}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabItems.map((tab) => (
          <Tabs.Panel key={tab.id} value={tab.id} p="lg">
            <Title order={2} mb={6}>
              {tab.heading}
            </Title>
            <Text size="sm" c="dimmed">
              {tab.body}
            </Text>
            <List spacing={4} mt="sm" listStyleType="none">
              {tab.bullets.map((bullet) => (
                <List.Item key={bullet}>
                  <Group gap={10} wrap="nowrap" align="center">
                    <Box
                      w={6}
                      h={6}
                      style={{
                        flexShrink: 0,
                        borderRadius: '50%',
                        background: 'var(--mantine-color-indigo-6)',
                      }}
                    />
                    <Text size="sm">{bullet}</Text>
                  </Group>
                </List.Item>
              ))}
            </List>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Card>
  );
}
