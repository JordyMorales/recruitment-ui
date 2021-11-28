import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface MultipleSelectChipProps {
  id: string;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  options: any[];
  onChange: any;
  withColor?: boolean;
  error?: boolean;
}

const MultipleSelectChip: React.FC<MultipleSelectChipProps> = ({
  id,
  label,
  placeholder,
  options,
  defaultValue,
  onChange,
  withColor = false,
  error,
}) => {
  return (
    <Autocomplete
      multiple
      id={id}
      options={options}
      getOptionLabel={(option) => option.name}
      defaultValue={defaultValue}
      freeSolo
      onChange={(e, value) => {
        if (typeof value[value.length - 1] === 'string') {
          value[value.length - 1] = {
            name: value[value.length - 1].trim(),
            color: withColor ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : null,
          };
        }
        onChange(value);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name}
            sx={{
              backgroundColor: option?.color,
              color: 'theme.palette.getContrastText',
            }}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          error={error}
        />
      )}
    />
  );
};

export default MultipleSelectChip;
