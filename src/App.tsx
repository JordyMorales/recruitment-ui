import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createCustomTheme } from './theme';

import RTL from './components/RTL';
import SplashScreen from './components/SplashScreen';
import SettingsDrawer from './components/SettingsDrawer';
import useSettings from './hooks/useSettings';
import useAuth from './hooks/useAuth';
import routes from './routes';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { LocalizationProvider } from '@mui/lab';

const App: React.FC = () => {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const auth = useAuth();
  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <ThemeProvider theme={theme}>
        <RTL direction={settings.direction}>
          <CssBaseline />
          <ToastContainer />
          <SettingsDrawer />
          {auth.isInitialized ? content : <SplashScreen />}
        </RTL>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
