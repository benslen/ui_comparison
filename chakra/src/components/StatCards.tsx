import { Box, Card, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import {
  ArrowDown,
  ArrowUp,
  CircleDollarSign,
  FileText,
  TrendingDown,
  Users,
} from 'lucide-react';
import { stats } from '@data';
import type { StatIcon } from '@data';

const icons: Record<StatIcon, typeof Users> = {
  revenue: CircleDollarSign,
  customers: Users,
  orders: FileText,
  churn: TrendingDown,
};

export function StatCards() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const isGood = stat.invertGood ? stat.direction === 'down' : stat.direction === 'up';
        const TrendIcon = stat.direction === 'up' ? ArrowUp : ArrowDown;
        const palette = isGood ? 'green' : 'red';

        return (
          <Card.Root key={stat.id} size="sm" variant="outline">
            <Card.Body>
              <HStack gap="3" align="flex-start">
                <Flex
                  w="40px"
                  h="40px"
                  flexShrink="0"
                  rounded="lg"
                  bg="bg.muted"
                  color="brand.fg"
                  align="center"
                  justify="center"
                >
                  <Icon size={20} />
                </Flex>
                <Box minW="0">
                  <Text fontSize="sm" color="fg.muted" truncate>
                    {stat.label}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" lineHeight="1.2">
                    {stat.value}
                  </Text>
                </Box>
              </HStack>

              <HStack gap="2" mt="3">
                <HStack
                  gap="0.5"
                  px="1.5"
                  py="0.5"
                  rounded="sm"
                  colorPalette={palette}
                  bg="colorPalette.subtle"
                  color="colorPalette.fg"
                >
                  <TrendIcon size={13} strokeWidth={2.5} />
                  <Text fontSize="xs" fontWeight="semibold">
                    {stat.delta}%
                  </Text>
                </HStack>
                <Text fontSize="xs" color="fg.muted">
                  {stat.caption}
                </Text>
              </HStack>
            </Card.Body>
          </Card.Root>
        );
      })}
    </SimpleGrid>
  );
}
