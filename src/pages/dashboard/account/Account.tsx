import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Breadcrumbs, Container, Divider, Grid, Link, Tab, Tabs, Typography } from '@mui/material';
import {
  Applications,
  GeneralSettings,
  NotificationsSettings,
  ProfessionalInformation,
  SecuritySettings,
} from '../../../components/dashboard/account';
import useSettings from '../../../hooks/useSettings';
import ChevronRightIcon from '../../../icons/ChevronRight';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Professional Information', value: 'professionalInformation' },
  { label: 'Applications', value: 'applications' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Security', value: 'security' },
];

const Account: React.FC = () => {
  let location = useLocation();
  const { settings } = useSettings();

  let { tab } = location.state || { tab: 'general' };

  const [currentTab, setCurrentTab] = useState<string>(tab);

  const { profile } = useSelector((state: RootState) => state.user);

  const handleTabsChange = (event: React.ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>NSC: Personal Account</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                {`${profile.firstName} ${profile.lastName}`}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 1 }}>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightIcon fontSize="small" />}
              sx={{ mt: 1 }}
            >
              <Link color="textPrimary" component={RouterLink} to="/app" variant="subtitle2">
                Dashboard
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Account
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {/* Applications */}
            {currentTab === 'general' && <GeneralSettings />}
            {currentTab === 'professionalInformation' && <ProfessionalInformation />}
            {currentTab === 'applications' && <Applications />}
            {currentTab === 'notifications' && <NotificationsSettings />}
            {currentTab === 'security' && <SecuritySettings />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;
