import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import { JobList } from '../../../components/dashboard/jobs';
import { RootState } from '../../../store/rootReducer';
import { jobActions } from '../../../store/job/actions';

import ChevronRightIcon from '../../../icons/ChevronRight';
import PlusIcon from '../../../icons/Plus';

const Jobs: React.FC = () => {
  const dispatch = useDispatch();
  const mounted = useMounted();
  const { settings } = useSettings();

  const {
    list: { jobs, isLoading, initialLoading },
  } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    if (mounted && initialLoading) {
      dispatch(jobActions.getAllJobsRequest());
    }
  }, [dispatch, mounted, initialLoading]);

  return (
    <>
      <Helmet>
        <title>NSC: Job list</title>
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
                Jobs
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PlusIcon />}
                  sx={{ m: 1, fontSize: { lg: 14, md: 13, sm: 12, xs: 11 } }}
                  to="/app/jobs/new"
                  variant="contained"
                >
                  New Job
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
              <Link color="textPrimary" component={RouterLink} to="/app/jobs" variant="subtitle2">
                Jobs
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Browse
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ mt: 3 }}>
            <JobList jobs={jobs} isLoading={isLoading} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Jobs;
