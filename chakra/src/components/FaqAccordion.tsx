import { Accordion, Box, Card, Text } from '@chakra-ui/react';
import { accordionItems, pageCopy } from '@data';
import { SectionHeader } from './SectionHeader';

export function FaqAccordion() {
  return (
    <Card.Root variant="outline" h="100%">
      <Box p="5" pb="1">
        <SectionHeader
          title={pageCopy.accordionTitle}
          subtitle="Common billing and access questions."
        />
      </Box>
      <Box px="3" pb="4">
        <Accordion.Root collapsible defaultValue={[accordionItems[0].id]}>
          {accordionItems.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.ItemTrigger>
                <Text fontSize="sm" fontWeight="semibold" flex="1" textAlign="start">
                  {item.question}
                </Text>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Text fontSize="sm" color="fg.muted">
                    {item.answer}
                  </Text>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </Card.Root>
  );
}
