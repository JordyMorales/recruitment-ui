import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import { LoginFirebase } from '../../components/authentication';

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'background.default',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="sm" sx={{ py: '80px' }}>
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <div>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Log in
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <LoginFirebase />
              </Box>
              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <Link color="textSecondary" component={RouterLink} to="/register" variant="body2">
                  Create new account
                </Link>

                <Link color="textSecondary" component={RouterLink} to="/password-recovery" variant="body2">
                  Forgot password
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
