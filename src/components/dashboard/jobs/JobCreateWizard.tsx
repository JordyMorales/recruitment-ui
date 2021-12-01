import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SelectProcessForm from './SelectProcessForm';
import JobDetailsForm from './JobDetailsForm';
import JobDescriptionForm from './JobDescriptionForm';
import { RootState } from '../../../store/rootReducer';

const JobCreateWizard: React.FC = (props) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const { job } = useSelector((state: RootState) => state.job);

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = (): void => {
    setCompleted(true);
  };

  return (
    <div {...props}>
      {!completed ? (
        <>
          {activeStep === 0 && <SelectProcessForm onNext={handleNext} />}
          {activeStep === 1 && <JobDetailsForm onBack={handleBack} onNext={handleNext} />}
          {activeStep === 2 && <JobDescriptionForm onBack={handleBack} onComplete={handleComplete} />}
        </>
      ) : (
        <Card>
          <CardContent>
            <Box
              sx={{
                maxWidth: 450,
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  <StarIcon fontSize="small" />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography align="center" color="textPrimary" variant="h3">
                  You are all done!
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography align="center" color="textSecondary" variant="subtitle1">
                  The new job was created successfully. If you want you can take a look at how it looks.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <Button
                  color="primary"
                  component={RouterLink}
                  to={`/app/jobs/${job.jobId}`}
                  variant="contained"
                >
                  View Job
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobCreateWizard;
