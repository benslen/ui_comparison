import { useState } from 'react';
import type { MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import { appName, avatarMenu, currentUser, navLinks } from '@data';

export function NavBar() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isDark = mode === 'dark';
  const openMenu = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mr: 3 }}>
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <InsightsRoundedIcon fontSize="small" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            {appName}
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
          {navLinks.map((link, index) => (
            <Button
              key={link.id}
              href={link.href}
              color={index === 0 ? 'primary' : 'inherit'}
              sx={{ fontWeight: index === 0 ? 700 : 500 }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton onClick={() => setMode(isDark ? 'light' : 'dark')} color="inherit">
            {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Account">
          <IconButton onClick={openMenu} sx={{ ml: 0.5 }} aria-label="Open account menu">
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14 }}>
              {currentUser.initials}
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{ paper: { sx: { minWidth: 232, mt: 1 } } }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 650 }}>
              {currentUser.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentUser.email}
            </Typography>
          </Box>
          {avatarMenu.map((item) => [
            item.dividerBefore ? <Divider key={`${item.id}-divider`} /> : null,
            <MenuItem key={item.id} onClick={closeMenu}>
              <ListItemText
                slotProps={{
                  primary: {
                    sx: { fontSize: 14, color: item.danger ? 'error.main' : undefined },
                  },
                }}
              >
                {item.label}
              </ListItemText>
            </MenuItem>,
          ])}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
