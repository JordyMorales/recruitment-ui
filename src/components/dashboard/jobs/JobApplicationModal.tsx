import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { RootState } from '../../../store/rootReducer';
import { applicationActions } from '../../../store/application/actions';
import { candidateActions } from '../../../store/candidate/actions';
import { processActions } from '../../../store/process/actions';

const JobApplicationModal: React.FC = () => {
  const dispatch = useDispatch();

  const { application, shouldClose, isOpen } = useSelector((state: RootState) => state.application);
  const { process } = useSelector((state: RootState) => state.process);
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (application.processId)
      dispatch(processActions.getProcessByIdRequest({ processId: application.processId }));
  }, [application.processId, dispatch]);

  const handleClose = useCallback(() => {
    dispatch(applicationActions.hiModal());
  }, [dispatch]);

  useEffect(() => {
    if (shouldClose) {
      handleClose();
    }
  }, [handleClose, shouldClose]);

  const handleApply = (): void => {
    dispatch(
      candidateActions.applyForJobRequest({
        ...application,
        otherInfo: value,
        stepId: process.steps[0].stepId,
      }),
    );
    dispatch(applicationActions.hiModal());
  };

  return (
    <Dialog maxWidth="lg" onClose={handleClose} open={isOpen}>
      <Box sx={{ p: 3 }}>
        <Typography align="center" color="textPrimary" gutterBottom variant="h4">
          The job requires an introduction
        </Typography>
        <Typography align="center" color="textSecondary" variant="subtitle2">
          Write down a short note with your application regarding why you think you&apos;d be a good fit for
          this position.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            autoFocus
            FormHelperTextProps={{
              sx: {
                textAlign: 'right',
                mr: 0,
              },
            }}
            fullWidth
            helperText={`${200 - value.length} characters left`}
            label="Short Note"
            multiline
            onChange={handleChange}
            placeholder="What excites you about this project?"
            rows={5}
            value={value}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            mt: 3,
            p: 3,
          }}
        >
          <Button color="primary" fullWidth onClick={handleApply} variant="contained">
            Apply
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default JobApplicationModal;
