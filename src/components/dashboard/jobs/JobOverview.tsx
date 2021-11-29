import React from 'react';
import { Grid } from '@mui/material';
import { Job } from '../../../types/job';
import JobBrief from './JobBrief';
import JobMetadata from './JobMetadata';

interface JobOverviewProps {
  job: Job;
}
const JobOverview: React.FC<JobOverviewProps> = (props) => {
  const { job, ...other } = props;

  return (
    <Grid container spacing={3} {...other}>
      <Grid item lg={8} xl={9} xs={12}>
        <JobBrief name={job.name} description={job.description} technologies={job.technologies} />
      </Grid>
      <Grid item lg={4} xl={3} xs={12}>
        <JobMetadata
          startDate={job.startDate}
          vacancies={job.vacancies}
          state={job.state}
          createdAt={job.createdAt}
        />
      </Grid>
    </Grid>
  );
};

export default JobOverview;
