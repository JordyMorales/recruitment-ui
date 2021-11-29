import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Grid,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Job } from '../../../types/job';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '../../../icons/ArrowRight';
import { jobActions } from '../../../store/job/actions';
import ScreenLoader from '../../ScreenLoader';
import { format } from 'date-fns';
import { formatDistanceToNowStrict } from 'date-fns';

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, isLoading }) => {
  const dispatch = useDispatch();

  if (isLoading)
    return (
      <div>
        <Box
          sx={{
            alignItems: 'center',
            // backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            left: 0,
            p: 3,
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 2000,
          }}
        >
          <ScreenLoader />
        </Box>
      </div>
    );

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {jobs.map((job, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
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
              {job.technologies.map((technology, index) => (
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
            {/* <CardActions>

            </CardActions> */}
            <Box sx={{ display: 'flex', mx: 2, mt: 3 }}>
              <Button color="primary" onClick={() => {}} size="large" variant="text">
                Previous
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button color="primary" type="submit" size="large" variant="contained">
                Complete
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
