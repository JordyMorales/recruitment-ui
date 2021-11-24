import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Grid, InputAdornment } from '@mui/material';

export interface MultiplePhonesProps {
  values: string[];
  onChange: any;
}

const MultiplePhones: React.FC<MultiplePhonesProps> = ({ values = [], onChange }: MultiplePhonesProps) => {
  const [phones, setPhones] = useState<Set<string>>(new Set(values));

  function handleChangeInput(index: number, value: string): void {
    const array = [...phones];
    const temp = [...array.slice(0, index), value, ...array.slice(index + 1)];
    setPhones(new Set(temp));
    onChange(temp);
  }

  function handleRemoveFields(phone: string): void {
    const temp = phones;
    temp.delete(phone);
    setPhones(temp);
    onChange([...temp]);
  }

  function handleAddFields(): void {
    const temp = phones;
    temp.add('');
    setPhones(temp);
    onChange([...temp]);
  }

  return (
    <Grid container spacing={3}>
      {[...phones].map((phone: string, index: number) => (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MuiPhoneNumber
            name="phone"
            defaultCountry="bo"
            fullWidth
            required={phones.size > 1}
            value={phone}
            onChange={(value) => handleChangeInput(index, value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {phones.size > 1 && (
                    <IconButton onClick={() => handleRemoveFields(phone)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
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
          Add Phone
        </Button>
      </Grid>
    </Grid>
  );
};

export default MultiplePhones;
