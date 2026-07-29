import { Box, Container, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import { pageCopy } from '@data';
import { NavBar } from './components/NavBar';
import { StatCards } from './components/StatCards';
import { CustomerTable } from './components/CustomerTable';
import { CustomerForm } from './components/CustomerForm';
import { ActionsPanel } from './components/ActionsPanel';
import { WorkspaceTabs } from './components/WorkspaceTabs';
import { FaqAccordion } from './components/FaqAccordion';

export default function App() {
  return (
    <Box minH="100vh" bg="bg.subtle">
      <NavBar />
      <Container maxW="1400px" py="8">
        <Box mb="6">
          <Heading as="h1" size="2xl">
            {pageCopy.title}
          </Heading>
          <Text color="fg.muted" mt="1">
            {pageCopy.subtitle}
          </Text>
        </Box>

        <Stack gap="6">
          <StatCards />

          <CustomerTable />

          <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap="6">
            <GridItem colSpan={{ base: 1, md: 7 }}>
              <CustomerForm />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 5 }}>
              <ActionsPanel />
            </GridItem>
          </Grid>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="6">
            <GridItem>
              <WorkspaceTabs />
            </GridItem>
            <GridItem>
              <FaqAccordion />
            </GridItem>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
