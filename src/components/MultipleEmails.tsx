import React, { useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface MultipleEmailsProps {
  values: string[];
  onChange: any;
}

const MultipleEmails: React.FC<MultipleEmailsProps> = ({ values = [], onChange }) => {
  const [emails, setEmails] = useState<Set<string>>(new Set(values));

  function handleChangeInput(index: number, value: string): void {
    const array = [...emails];
    const temp = [...array.slice(0, index), value, ...array.slice(index + 1)];
    setEmails(new Set(temp));
    onChange(temp);
  }

  function handleRemoveFields(email: string): void {
    const temp = emails;
    temp.delete(email);
    setEmails(temp);
    onChange([...temp]);
  }

  function handleAddFields(): void {
    const temp = emails;
    temp.add('');
    setEmails(temp);
    onChange([...temp]);
  }

  return (
    <Grid container spacing={3}>
      {[...emails].map((email: string, index: number) => (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            name="email"
            type="email"
            placeholder="Email address"
            variant="standard"
            required={emails.size > 1}
            fullWidth
            value={email}
            onChange={(event: any) => handleChangeInput(index, event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleRemoveFields(email)}>
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      ))}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAddFields}
        >
          Add Email
        </Button>
      </Grid>
    </Grid>
  );
};

export default MultipleEmails;
