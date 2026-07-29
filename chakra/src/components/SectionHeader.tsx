import { Box, Heading, Text } from '@chakra-ui/react';

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box mb="1">
      <Heading as="h2" size="md">
        {title}
      </Heading>
      <Text fontSize="sm" color="fg.muted">
        {subtitle}
      </Text>
    </Box>
  );
}
