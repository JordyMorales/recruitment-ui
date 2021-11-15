import React from 'react';
import Button from '@mui/material/Button';
import { createCustomTheme } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useSettings from './hooks/useSettings';

const App: React.FC = () => {
  const { settings } = useSettings();

  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained">Hello World</Button>
    </ThemeProvider>
  );
};

export default App;
