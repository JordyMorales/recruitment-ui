import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';

import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import ChevronRightIcon from '../../../icons/ChevronRight';
import PlusIcon from '../../../icons/Plus';
import { RootState } from '../../../store/rootReducer';
import { processActions } from '../../../store/process/actions';
import { ProcessList } from '../../../components/dashboard/process';

const Process: React.FC = () => {
  const dispatch = useDispatch();
  const mounted = useMounted();
  const { settings } = useSettings();

  const {
    list: {processes, isLoading, initialLoading }
  } = useSelector((state: RootState) => state.process);

  useEffect(() => {
    if (mounted && initialLoading) {
      dispatch(processActions.getAllProcessesRequest());
    }
  }, [dispatch, mounted, initialLoading]);

  return (
    <>
      <Helmet>
        <title>NSC: Process list</title>
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
                Process
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PlusIcon />}
                  sx={{ m: 1, fontSize: { lg: 14, md: 13, sm: 12, xs: 11 } }}
                  to="/app/processes/new"
                  variant="contained"
                >
                  New Process
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
              <Link color="textPrimary" component={RouterLink} to="/app/processes" variant="subtitle2">
                Process
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Browse
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ mt: 3 }}><ProcessList processes={processes} isLoading={isLoading} /></Box>
        </Container>
      </Box>
    </>
  );
};

export default Process;
