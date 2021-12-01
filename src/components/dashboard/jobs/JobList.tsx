import React, { useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Card, CardHeader, CardContent, Chip, Grid, Typography, Button } from '@mui/material';
import { Job } from '../../../types/job';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '../../../icons/ArrowRight';
import { jobActions } from '../../../store/job/actions';
import AnimatedLogo from '../../../icons/AnimatedLogo';
import SendIcon from '../../../icons/Send';
import { applicationActions } from '../../../store/application/actions';
import useAuth from '../../../hooks/useAuth';
import JobApplicationModal from './JobApplicationModal';
import Guard from '../../Guard';
import { RootState } from '../../../store/rootReducer';
import { toast } from 'react-toastify';
import { candidateActions } from '../../../store/candidate/actions';
import useMounted from '../../../hooks/useMounted';

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, isLoading }) => {
  const { user } = useAuth();
  const mounted = useMounted();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { profile } = useSelector((state: RootState) => state.user);
  const { account } = useSelector((state: RootState) => state.candidate);

  useEffect(() => {
    if (mounted && profile.userId) {
      dispatch(candidateActions.getCandidateProfileRequest({ candidateId: profile.userId }));
    }
  }, [dispatch, mounted, profile]);

  if (isLoading)
    return (
      <Grid container sx={{ height: '55vh' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <AnimatedLogo />
        </Box>
      </Grid>
    );

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {jobs.map((job, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card>
            <CardHeader
              action={
                <IconButton
                  aria-label="settings"
                  component={RouterLink}
                  onClick={() => dispatch(jobActions.setJob(job))}
                  to={`/app/jobs/${job.jobId}`}
                >
                  <ArrowRightIcon />
                </IconButton>
              }
              title={
                <Typography sx={{ fontSize: { xl: 24, lg: 19, md: 17, sm: 16, xs: 15 } }}>
                  {job.name}
                </Typography>
              }
              subheader={`Job will start in ${formatDistanceToNowStrict(new Date(job.startDate))}`}
            />
            <CardContent
              sx={{
                width: '100%',
                overflow: 'auto',
                whiteSpace: 'nowrap',
                '::-webkit-scrollbar': {
                  height: '3px',
                },
                '::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(145, 158, 171, 0.24)',
                },
                '::-webkit-scrollbar-thumb:horizontal': {
                  backgroundColor: 'rgba(145, 158, 171, 0.24)',
                },
              }}
            >
              {job.technologies.map((technology) => (
                <Chip
                  key={technology.technologyId}
                  label={
                    <Typography sx={{ fontSize: { lg: 11, md: 11, sm: 11, xs: 10 } }}>
                      {technology.name}
                    </Typography>
                  }
                  sx={{ mr: 0.3 }}
                />
              ))}
            </CardContent>
            <Box sx={{ display: 'flex', mx: 1, mb: 1 }}>
              <Guard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER']}>
                <Button
                  color="primary"
                  component={RouterLink}
                  sx={{ m: 1 }}
                  to={`/app/jobs/${job.jobId}/board`}
                  variant="text"
                >
                  View board
                </Button>
              </Guard>
              <Box sx={{ flexGrow: 1 }} />
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
          </Card>
        </Grid>
      ))}

      <JobApplicationModal />
    </Grid>
  );
};

export default JobList;
