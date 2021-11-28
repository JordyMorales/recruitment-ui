import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Grid,
  Typography,
  Button,
  Paper,
  Radio,
  FormHelperText,
} from '@mui/material';
import { RootState } from '../../../store/rootReducer';
import { processActions } from '../../../store/process/actions';
import useMounted from '../../../hooks/useMounted';
import { jobActions } from '../../../store/job/actions';
import ScreenLoader from '../../ScreenLoader';

interface SelectProcessFormProps {
  onBack?: () => void;
  onNext?: () => void;
}

const SelectProcessForm: React.FC<SelectProcessFormProps> = (props) => {
  const { onBack, onNext, ...other } = props;

  const mounted = useMounted();
  const dispatch = useDispatch();

  const { job } = useSelector((state: RootState) => state.job);

  const [error, setError] = useState<string | null>(null);

  const {
    list: { processes, isLoading, initialLoading },
  } = useSelector((state: RootState) => state.process);

  useEffect(() => {
    if (mounted && initialLoading) {
      dispatch(processActions.getAllProcessesRequest());
    }
  }, [dispatch, mounted, initialLoading]);

  useEffect(() => {
    if (mounted && processes.length && !job.processId) {
      dispatch(jobActions.setJob({ processId: processes[0].processId }));
    }
  }, [dispatch, job.processId, mounted, processes]);

  const handleChange = (processId: string): void => {
    dispatch(jobActions.setJob({ processId }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (onNext) {
        onNext();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} {...other}>
      <Card sx={{ p: { xs: 0, md: 2 } }}>
        <CardHeader
          title={
            <Typography color="textPrimary" variant="h6">
              Select process
            </Typography>
          }
          subheader={
            <Typography color="textSecondary" variant="body1">
              Please select the process you want to use{' '}
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {isLoading ? (
              <ScreenLoader />
            ) : (
              processes.map((process) => (
                <Grid item key={process.processId} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Paper variant="outlined" onClick={(): void => handleChange(process.processId)}>
                    <Box
                      sx={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        mb: 2,
                        padding: 2,
                      }}
                    >
                      <Radio checked={job.processId === process.processId} color="primary" />
                      <Box sx={{ ml: 2 }}>
                        <Typography color="textPrimary" variant="subtitle2">
                          {process.name}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {process.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        m: 3,
                      }}
                    >
                      {process.steps.map((step, index) => (
                        <Chip
                          key={index}
                          size="small"
                          label={
                            <Typography sx={{ fontSize: { lg: 11, md: 11, sm: 11, xs: 10 } }}>
                              {step.name}
                            </Typography>
                          }
                          sx={{ mr: 0.3, mt: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>
        </CardContent>
        {error && (
          <Box sx={{ mt: 2 }}>
            <FormHelperText error>{error}</FormHelperText>
          </Box>
        )}
        <Box sx={{ display: 'flex', mx: 2, mt: 3 }}>
          {onBack && (
            <Button color="primary" onClick={onBack} size="large" variant="text">
              Previous
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button color="primary" disabled={false} size="large" type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SelectProcessForm;
