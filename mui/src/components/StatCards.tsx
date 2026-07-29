import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { stats } from '@data';
import type { StatIcon } from '@data';

const icons: Record<StatIcon, typeof PaymentsRoundedIcon> = {
  revenue: PaymentsRoundedIcon,
  customers: GroupsRoundedIcon,
  orders: ReceiptLongRoundedIcon,
  churn: TrendingDownRoundedIcon,
};

export function StatCards() {
  return (
    <Grid container spacing={2}>
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const isGood = stat.invertGood ? stat.direction === 'down' : stat.direction === 'up';
        const TrendIcon = stat.direction === 'up' ? ArrowUpwardRoundedIcon : ArrowDownwardRoundedIcon;

        return (
          <Grid key={stat.id} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: 'action.hover',
                      color: 'primary.main',
                      flexShrink: 0,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.25 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1.5 }}>
                  <Box
                    sx={(theme) => {
                      const tone = isGood ? theme.palette.success : theme.palette.error;
                      return {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.25,
                        px: 0.75,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: 13,
                        fontWeight: 650,
                        color: tone.main,
                        bgcolor: alpha(tone.main, 0.12),
                      };
                    }}
                  >
                    <TrendIcon sx={{ fontSize: 14 }} />
                    {stat.delta}%
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {stat.caption}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
