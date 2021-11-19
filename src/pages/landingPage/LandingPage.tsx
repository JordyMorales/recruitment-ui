import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@mui/material';

const LandingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>LandingPage</title>
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
                    Landing Page
                  </Typography>
                </div>
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
                  Register
                </Link>

                <Link color="textSecondary" component={RouterLink} to="/login" variant="body2">
                  Login
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;
