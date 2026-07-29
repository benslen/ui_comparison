import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h1">{pageCopy.title}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            {pageCopy.subtitle}
          </Typography>
        </Box>

        <Stack spacing={3}>
          <StatCards />

          <CustomerTable />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>
              <CustomerForm />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <ActionsPanel />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <WorkspaceTabs />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FaqAccordion />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
