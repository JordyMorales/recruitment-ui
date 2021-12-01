import React from 'react';
import { Box, useTheme } from '@mui/material';
import NearshoreCode from './NearshoreCode';

const SlashScreen: React.FC = () => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        p: 3,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 2000,
      }}
    >
      <NearshoreCode textColor={palette.text.primary} />
    </Box>
  );
};

export default SlashScreen;
