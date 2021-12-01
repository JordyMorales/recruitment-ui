import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { formatDistanceToNowStrict } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { JobOverview } from '../../../components/dashboard/jobs';
import { RootState } from '../../../store/rootReducer';
import { jobActions } from '../../../store/job/actions';

import useAuth from '../../../hooks/useAuth';
import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import SendIcon from '../../../icons/Send';
import ChevronRightIcon from '../../../icons/ChevronRight';
import CalendarIcon from '../../../icons/Calendar';
import ScreenLoader from '../../../components/ScreenLoader';
import JobApplicationModal from '../../../components/dashboard/jobs/JobApplicationModal';
import Guard from '../../../components/Guard';
import { applicationActions } from '../../../store/application/actions';
import { candidateActions } from '../../../store/candidate/actions';

const JobDetails: React.FC = () => {
  const mounted = useMounted();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();

  const { settings } = useSettings();

  const { profile } = useSelector((state: RootState) => state.user);
  const { account } = useSelector((state: RootState) => state.candidate);
  const { isLoading, job } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    if (mounted && profile.userId) {
      dispatch(candidateActions.getCandidateProfileRequest({ candidateId: profile.userId }));
    }
  }, [dispatch, mounted, profile]);

  useEffect(() => {
    if (mounted && params.jobId && !job.jobId) {
      dispatch(jobActions.getJobByIdRequest({ jobId: params.jobId }));
    }
  }, [dispatch, mounted, job, params.jobId]);

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
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Guard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER']}>
                  <Button
                    color="primary"
                    component={RouterLink}
                    sx={{ m: 1 }}
                    to={`/app/jobs/${params.jobId}/board`}
                    variant="text"
                  >
                    View board
                  </Button>
                </Guard>
                <Button
                  color="primary"
                  onClick={() => {
                    if (account.candidateId) {
                      dispatch(
                        applicationActions.setApplication({
                          dateOfApplication: new Date(),
                          otherInfo: '',
                          appliedBy: user.userId,
                          jobId: job.jobId,
                          state: 'APPLIED',
                          processId: job.processId,
                        }),
                      );
                      dispatch(applicationActions.showModal());
                    } else {
                      toast.warning('Fill in your professional information. Click on me to go there!', {
                        onClick: () =>
                          navigate('/app/account', {
                            state: {
                              tab: 'professionalInformation',
                            },
                          }),
                      });
                    }
                  }}
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
      <JobApplicationModal />
    </>
  );
};

export default JobDetails;
