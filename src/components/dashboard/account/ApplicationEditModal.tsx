import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { RootState } from '../../../store/rootReducer';
import { applicationActions } from '../../../store/application/actions';
import { candidateActions } from '../../../store/candidate/actions';

const JobApplicationEditModal: React.FC = () => {
  const dispatch = useDispatch();

  const { application, shouldClose, isOpen } = useSelector((state: RootState) => state.application);
  const [value, setValue] = useState<string>(application.otherInfo);

  useEffect(() => {
    setValue(application.otherInfo);
  }, [application]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleClose = useCallback(() => {
    dispatch(applicationActions.hiModal());
  }, [dispatch]);

  useEffect(() => {
    if (shouldClose) {
      handleClose();
    }
  }, [handleClose, shouldClose]);

  const handleSubmit = (): void => {
    dispatch(
      candidateActions.updateApplicationRequest({
        ...application,
        otherInfo: value,
        stepId: application.step.stepId,
      }),
    );
    dispatch(applicationActions.hiModal());
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={isOpen}>
      <Box sx={{ p: 3 }}>
        <Typography align="center" color="textPrimary" gutterBottom variant="h4">
          Application
        </Typography>
        <Typography align="center" color="textSecondary" variant="subtitle2">
          Write down a short note with your application regarding why you think you&apos;d be a good fit for
          this position.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            autoFocus
            FormHelperTextProps={{ sx: { textAlign: 'right', mr: 0 } }}
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
        <Box sx={{ mt: 3, p: 3 }}>
          <Button color="primary" fullWidth onClick={handleSubmit} variant="contained">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default JobApplicationEditModal;
