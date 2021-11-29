import React, { useState } from 'react';
import { Avatar, Box, Button, Dialog, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

interface JobApplicationModalProps {
  onApply?: () => void;
  onClose?: () => void;
  open: boolean;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = (props) => {
  const { onApply, onClose, open, ...other } = props;
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleApply = (): void => {
    toast.success('Request sent!');

    if (onApply) {
      onApply();
    }
  };

  return (
    <Dialog maxWidth="lg" onClose={onClose} open={open} {...other}>
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 6,
            }}
          >
            <Box sx={{ ml: 2 }}>
              <Typography color="textPrimary" variant="subtitle2">
                {/* {authorName} */}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Author note: Please remember to include your soft skills.
              </Typography>
            </Box>
          </Box>
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
