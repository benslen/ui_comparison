import { Box, Card, Heading, HStack, Stack, Tabs, Text } from '@chakra-ui/react';
import { tabItems } from '@data';

export function WorkspaceTabs() {
  return (
    <Card.Root variant="outline" h="100%">
      <Tabs.Root defaultValue={tabItems[0].id} colorPalette="brand">
        <Tabs.List px="2">
          {tabItems.map((tab) => (
            <Tabs.Trigger key={tab.id} value={tab.id} fontWeight="semibold">
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabItems.map((tab) => (
          <Tabs.Content key={tab.id} value={tab.id} p="5">
            <Heading as="h2" size="md" mb="1.5">
              {tab.heading}
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              {tab.body}
            </Text>
            <Stack gap="1.5" mt="3">
              {tab.bullets.map((bullet) => (
                <HStack key={bullet} gap="2.5" align="center">
                  <Box w="6px" h="6px" rounded="full" bg="brand.solid" flexShrink="0" />
                  <Text fontSize="sm">{bullet}</Text>
                </HStack>
              ))}
            </Stack>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Card.Root>
  );
}
