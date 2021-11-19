import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box } from '@mui/material';

const LoadingScreen: React.FC = () => {
  useEffect(() => {
    NProgress.start();

    return (): void => {
      NProgress.done();
    };
  }, []);

  return <Box sx={{ backgroundColor: 'background.paper', minHeight: '100%' }} />;
};

export default LoadingScreen;
