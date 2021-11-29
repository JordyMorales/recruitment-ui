import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { JobOverview } from '../../../components/dashboard/jobs';
import { RootState } from '../../../store/rootReducer';
import { jobActions } from '../../../store/job/actions';

import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import ShareIcon from '../../../icons/Share';
import SendIcon from '../../../icons/Send';
import ChevronRightIcon from '../../../icons/ChevronRight';
import CalendarIcon from '../../../icons/Calendar';
import ScreenLoader from '../../../components/ScreenLoader';
import JobApplicationModal from '../../../components/dashboard/jobs/JobApplicationModal';

const JobDetails = () => {
  const mounted = useMounted();
  const dispatch = useDispatch();
  const params = useParams();

  const { settings } = useSettings();

  const { isLoading, job } = useSelector((state: RootState) => state.job);

  const [isApplicationOpen, setIsApplicationOpen] = useState<boolean>(false);

  useEffect(() => {
    if (mounted && params.jobId && !job.jobId) {
      dispatch(jobActions.getJobByIdRequest({ jobId: params.jobId }));
    }
  }, [dispatch, mounted, job, params.jobId]);

  const handleApplyModalOpen = (): void => {
    setIsApplicationOpen(true);
  };

  const handleApplyModalClose = (): void => {
    setIsApplicationOpen(false);
  };

  if (isLoading) return <ScreenLoader />;

  return (
    <>
      <Helmet>
        <title>NSC: Job details</title>
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
                {job.name}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  color: 'text.secondary',
                  display: 'flex',
                  flexWrap: 'wrap',
                  mb: -2,
                  mx: -2,
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2,
                  }}
                >
                  {job.startDate && (
                    <>
                      <CalendarIcon fontSize="small" />
                      <Typography color="inherit" sx={{ ml: 1 }} variant="subtitle2">
                        {`Job will start in ${formatDistanceToNowStrict(new Date(job.startDate))}`}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
            {/* <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PencilAltIcon />}
                  sx={{ mt: 2, ml: 1, fontSize: { lg: 14, md: 13, sm: 12, xs: 11 } }}
                  to={`/app/jobs/${params.jobId}/edit`}
                  variant="contained"
                >
                  Edit
                </Button>
              </Box>
            </Grid> */}
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<ShareIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                >
                  Share
                </Button>
                <Button
                  color="primary"
                  onClick={handleApplyModalOpen}
                  startIcon={<SendIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Apply
                </Button>
              </Box>
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
              <Link color="textPrimary" component={RouterLink} to="/app/jobs" variant="subtitle2">
                Jobs
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Details
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box sx={{ mt: 3 }}>{isLoading ? <ScreenLoader /> : <JobOverview job={job} />}</Box>
        </Container>
      </Box>
      <JobApplicationModal
        onApply={handleApplyModalClose}
        onClose={handleApplyModalClose}
        open={isApplicationOpen}
      />
    </>
  );
};

export default JobDetails;
