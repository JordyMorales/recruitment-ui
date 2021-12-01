import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import { PasswordRecoveryFirebase } from '../../components/authentication';
import StaticLogo from '../../icons/StaticLogo';

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
                <Box>
                  <RouterLink to="/">
                    <StaticLogo
                      sx={{
                        height: { sx: '70px', md: '80px', lg: '90px', xl: '100px' },
                        width: { sx: '70px', md: '80px', lg: '90px', xl: '100px' },
                      }}
                    />
                  </RouterLink>
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <PasswordRecoveryFirebase />
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
                <Link color="textSecondary" component={RouterLink} to="/login" variant="body2">
                  Having an account
                </Link>
                <Link color="textSecondary" component={RouterLink} to="/register" variant="body2">
                  Create new account
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordRecovery;
