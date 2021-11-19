import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Outlet } from 'react-router';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));

const DashboardLayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: '24px',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '280px',
  },
}));

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
  position: 'relative',
  WebkitOverflowScrolling: 'touch',
});

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)} />
      <DashboardSidebar
        onMobileClose={(): void => setIsSidebarMobileOpen(false)}
        openMobile={isSidebarMobileOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
