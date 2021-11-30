import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Avatar, Box, Divider, Drawer, Link, Typography, Theme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { RootState } from '../../store/rootReducer';
import { userActions } from '../../store/user/actions';
import Scrollbar from '../Scrollbar';
import NavSection from '../NavSection';
import Guard from '../Guard';

import Logo from '../Logo';
import HomeIcon from '../../icons/Home';
import CodeIcon from '../../icons/Code';
import UsersIcon from '../../icons/Users';
import JobsIcon from '../../icons/Jobs';
import InterviewIcon from '../../icons/Interview';
import ManageAccountIcon from '../../icons/ManageAccount';
import TagsIcon from '../../icons/Tags';
import ProcessIcon from '../../icons/Process';

import { Role } from '../../types/user';

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const sections = [
  {
    title: 'General',
    items: [
      {
        title: 'Overview',
        path: '/app',
        icon: <HomeIcon fontSize="small" />,
      },
    ],
    roles: ['ADMIN', 'RECRUITER', 'INTERVIEWER', 'EMPLOYEE', 'CANDIDATE'] as Role[],
  },
  {
    title: 'Management',
    items: [
      {
        title: 'Candidates',
        path: '/app/candidates',
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: 'List',
            path: '/app/candidates',
            roles: ['ADMIN'] as Role[],
          },
          {
            title: 'Create',
            path: '/app/candidates/new',
            roles: ['ADMIN', 'RECRUITER', 'INTERVIEWER'] as Role[],
          },
        ],
        roles: ['ADMIN', 'RECRUITER'] as Role[],
      },
      {
        title: 'Job Listings',
        path: '/app/jobs',
        icon: <JobsIcon fontSize="small" />,
        children: [
          {
            title: 'Browse',
            path: '/app/jobs',
            roles: ['ADMIN', 'RECRUITER', 'INTERVIEWER', 'CANDIDATE'] as Role[],
          },
          {
            title: 'Create',
            path: '/app/jobs/new',
            roles: ['ADMIN', 'RECRUITER',] as Role[],
          },
        ],
        roles: ['ADMIN', 'RECRUITER', 'INTERVIEWER', 'CANDIDATE'] as Role[],
      },
      {
        title: 'Interviews',
        icon: <InterviewIcon fontSize="small" />,
        path: '/app/interviews',
        children: [
          {
            title: 'List',
            path: '/app/interviews',
            roles: ['ADMIN', 'RECRUITER', 'INTERVIEWER',] as Role[],
          },
          {
            title: 'Create',
            path: '/app/interviews/new',
            roles: ['ADMIN', 'RECRUITER'] as Role[],
          },
        ],
        roles: ['ADMIN', 'RECRUITER', 'INTERVIEWER',] as Role[],
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Process',
        path: '/app/processes',
        icon: <ProcessIcon fontSize="small" />,
        roles: ['ADMIN', 'RECRUITER'] as Role[],
      },
      {
        title: 'Users',
        path: '/app/users',
        icon: <ManageAccountIcon fontSize="small" />,
        roles: ['ADMIN'] as Role[],
      },
      {
        title: 'Technologies',
        path: '/app/technologies',
        icon: <CodeIcon fontSize="small" />,
        roles: ['ADMIN', 'RECRUITER'] as Role[],
      },
      {
        title: 'Tags',
        path: '/app/tags',
        icon: <TagsIcon fontSize="small" />,
        roles: ['ADMIN', 'RECRUITER'] as Role[],
      },
    ],
    roles: ['ADMIN', 'RECRUITER'] as Role[],
  },
];

const CustomBox = styled(Box)(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    backgroundColor: 'rgb(68,65,72)',
    boxShadow: 'none',
    color: theme.palette.primary.contrastText,
  }),
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
  }),
}));

const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const { profile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!profile.userId) {
      dispatch(userActions.getCurrentUserRequest());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CustomBox
        sx={{
          display: {
            lg: 'none',
            xs: 'flex',
          },
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 64,
        }}
      >
        <RouterLink to="/">
          <Logo
            sx={{
              display: 'flex',
              height: 'auto',
              width: 200,
            }}
          />
        </RouterLink>
      </CustomBox>
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 1,
              display: 'flex',
              overflow: 'hidden',
              p: 2,
            }}
          >
            <RouterLink to="/app/account">
              <Avatar
                src={profile.photoUrl}
                sx={{
                  cursor: 'pointer',
                  height: 48,
                  width: 48,
                }}
              />
            </RouterLink>
            <Box sx={{ ml: 2 }}>
              <Typography color="textPrimary" variant="subtitle2">
                {`${profile.firstName} ${profile.lastName}`}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Role:{' '}
                <Link color="primary" component={RouterLink} to="/app/account">
                  {profile.role}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section, index) => (
            <Guard roles={section.roles} key={index}>
              <NavSection
                pathname={location.pathname}
                sx={{
                  '& + &': {
                    mt: 3,
                  },
                }}
                {...section}
              />
            </Guard>
          ))}
        </Box>
        <Divider />
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100% - 64px) !important',
            top: '65px !Important',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 280,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default DashboardSidebar;
