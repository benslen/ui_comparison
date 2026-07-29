import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { tabItems } from '@data';

export function WorkspaceTabs() {
  const [value, setValue] = useState(0);
  const active = tabItems[value];

  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(_event, next: number) => setValue(next)} sx={{ px: 1 }}>
          {tabItems.map((tab) => (
            <Tab key={tab.id} label={tab.label} sx={{ textTransform: 'none', fontWeight: 600 }} />
          ))}
        </Tabs>
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h2" gutterBottom>
          {active.heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {active.body}
        </Typography>
        <List dense sx={{ mt: 0.5 }}>
          {active.bullets.map((bullet) => (
            <ListItem key={bullet} disableGutters sx={{ py: 0.25 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  mr: 1.5,
                  flexShrink: 0,
                }}
              />
              <ListItemText slotProps={{ primary: { variant: 'body2' } }}>{bullet}</ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
