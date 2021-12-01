import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, AppBarProps, Box, IconButton, Toolbar, useTheme } from '@mui/material';
import AccountPopover from './AccountPopover';
import MenuIcon from '../../icons/Menu';
import Logo from '../Logo';

interface DashboardNavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    backgroundColor: '#293142',
    boxShadow: 'none',
    color: theme.palette.primary.contrastText,
  }),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
}));

const DashboardNavbar: React.FC<DashboardNavbarProps> = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  const { palette } = useTheme();

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: 'none',
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ width: 232, display: 'flex', justifyContent: 'center' }}>
          <RouterLink to="/">
            <Logo
              textColor={palette.text.secondary}
              sx={{
                display: { lg: 'flex', xs: 'none' },
                height: 'auto',
                width: 200,
              }}
            />
          </RouterLink>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2,
          }}
        />
        <Box sx={{ ml: 2 }}>
          <AccountPopover />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func,
};

export default DashboardNavbar;
