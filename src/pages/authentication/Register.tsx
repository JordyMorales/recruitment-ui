import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';
import { RegisterFirebase } from '../../components/authentication';
import StaticLogo from '../../icons/StaticLogo';

const Register: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
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
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <div>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Register
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Register on the recruiting platform
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
                <RegisterFirebase />
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link color="textSecondary" component={RouterLink} to="/login" variant="body2">
                Having an account
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;
