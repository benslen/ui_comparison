import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { accordionItems, pageCopy } from '@data';
import { SectionHeader } from './SectionHeader';

export function FaqAccordion() {
  const [expanded, setExpanded] = useState<string | false>(accordionItems[0].id);

  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ p: 2.5, pb: 1 }}>
        <SectionHeader title={pageCopy.accordionTitle} subtitle="Common billing and access questions." />
      </Box>
      <Box sx={{ px: 1.5, pb: 2 }}>
        {accordionItems.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={(_event, isExpanded) => setExpanded(isExpanded ? item.id : false)}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: 'transparent',
              '&::before': { display: 'none' },
              borderBottom: 1,
              borderColor: 'divider',
              '&:last-of-type': { borderBottom: 0 },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Card>
  );
}
