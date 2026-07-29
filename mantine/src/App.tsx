import { Box, Container, Grid, Stack, Text, Title } from '@mantine/core';
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
    <Box mih="100vh" bg="var(--mantine-color-default)">
      <NavBar />
      <Container size={1400} py="xl">
        <Box mb="lg">
          <Title order={1}>{pageCopy.title}</Title>
          <Text c="dimmed" mt={4}>
            {pageCopy.subtitle}
          </Text>
        </Box>

        <Stack gap="lg">
          <StatCards />

          <CustomerTable />

          <Grid gap="lg">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <CustomerForm />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <ActionsPanel />
            </Grid.Col>
          </Grid>

          <Grid gap="lg">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <WorkspaceTabs />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <FaqAccordion />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
