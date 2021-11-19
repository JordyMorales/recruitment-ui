import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { PasswordRecoveryFirebase } from '../../components/authentication';
import Logo from '../../components/Logo';

const PasswordRecovery: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Password Recovery</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="sm" sx={{ py: 10 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <RouterLink to="/">
              <Logo
                sx={{
                  height: 40,
                  width: 40,
                }}
              />
            </RouterLink>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8,
            }}
          />
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4,
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <div>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Password Recovery
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Tell us your email so we can send you a reset link
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <PasswordRecoveryFirebase />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordRecovery;
