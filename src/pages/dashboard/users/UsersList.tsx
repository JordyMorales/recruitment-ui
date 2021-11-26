import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { RootState } from '../../../store/rootReducer';
import { userActions } from '../../../store/user/actions';
import { UserListTable, UserModal } from '../../../components/dashboard/users';

import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import ChevronRightIcon from '../../../icons/ChevronRight';
import PlusIcon from '../../../icons/Plus';

const UserList: React.FC = () => {
  const dispatch = useDispatch();

  const mounted = useMounted();
  const { settings } = useSettings();

  const {
    isOpen,
    shouldClose,
    list: { users, isLoading, initialLoading },
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (mounted && initialLoading) {
      dispatch(userActions.getAllUsersRequest());
    }
  }, [dispatch, mounted, initialLoading]);

  const handleClose = useCallback(() => {
    dispatch(userActions.hiModal());
  }, [dispatch]);

  useEffect(() => {
    if (shouldClose) {
      handleClose();
    }
  }, [handleClose, shouldClose]);

  return (
    <>
      <Helmet>
        <title>Dashboard: User List</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Users
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon />}
                  sx={{ m: 1, fontSize: { lg: 14, md: 13, sm: 12, xs: 11 } }}
                  onClick={() => dispatch(userActions.showModal())}
                  variant="contained"
                >
                  New User
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightIcon fontSize="small" />}
              sx={{ mt: 1 }}
            >
              <Link color="textPrimary" component={RouterLink} to="/app" variant="subtitle2">
                Dashboard
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Users
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ mt: 3 }}>
            <UserListTable users={users} isLoading={isLoading} />
          </Box>
        </Container>
      </Box>
      <UserModal isOpen={isOpen} handleClose={handleClose} updateForm={false} />
    </>
  );
};

export default UserList;
