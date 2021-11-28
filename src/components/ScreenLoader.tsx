import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

const ScreenLoader: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default ScreenLoader;
