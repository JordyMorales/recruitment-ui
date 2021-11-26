import React from 'react';
import { CircularProgress, Container } from '@mui/material';

const ScreenLoader: React.FC = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default ScreenLoader;
