import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Card, CardHeader, Grid, Typography } from '@mui/material';
import { candidateActions } from '../../../store/candidate/actions';
import { RootState } from '../../../store/rootReducer';
import useMounted from '../../../hooks/useMounted';
import AnimatedLogo from '../../../icons/AnimatedLogo';

const CandidateApplications = () => {
  const mounted = useMounted();
  const dispatch = useDispatch();

  const { isLoading, applications, candidate } = useSelector((state: RootState) => state.candidate);

  useEffect(() => {
    if (mounted) {
      dispatch(candidateActions.getCandidateApplicationsRequest({ candidateId: candidate.candidateId }));
    }
  }, [dispatch, mounted, candidate.candidateId]);

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
      {applications.applications.length > 0 ? (
        applications.applications.map((application, index) => (
          <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card>
              <CardHeader
                title={
                  <Typography sx={{ fontSize: { xl: 16, lg: 15, md: 14, sm: 13, xs: 12 } }}>
                    {application.otherInfo}
                  </Typography>
                }
                subheader={
                  <Typography
                    color="textSecondary"
                    component="p"
                    variant="caption"
                    sx={{ fontSize: { xl: 16, lg: 15, md: 14, sm: 13, xs: 12 } }}
                  >
                    Applied at {format(new Date(application.appliedAt), 'dd MMM yyyy')}
                  </Typography>
                }
              />
              <Box sx={{ display: 'flex', mx: 2, mb: 2 }}>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  color="primary"
                  component={RouterLink}
                  to={`/app/jobs/${application.jobId}`}
                  variant="text"
                >
                  View Job
                </Button>
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid container sx={{ height: '70vh' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              height: '70%',
            }}
          >
            <Typography color="textPrimary" variant="h6">
            This candidate has not yet applied to any job.
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default CandidateApplications;
