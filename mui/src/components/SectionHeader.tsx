import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={{ mb: 0.5 }}>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}
