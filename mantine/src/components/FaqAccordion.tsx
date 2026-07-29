import { Accordion, Box, Card, Text } from '@mantine/core';
import { accordionItems, pageCopy } from '@data';
import { SectionHeader } from './SectionHeader';

export function FaqAccordion() {
  return (
    <Card withBorder radius="md" padding={0} h="100%">
      <Box p="lg" pb={4}>
        <SectionHeader
          title={pageCopy.accordionTitle}
          subtitle="Common billing and access questions."
        />
      </Box>
      <Box px="sm" pb="md">
        <Accordion defaultValue={accordionItems[0].id} variant="default">
          {accordionItems.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Control>
                <Text size="sm" fw={600}>
                  {item.question}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="sm" c="dimmed">
                  {item.answer}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Box>
    </Card>
  );
}
