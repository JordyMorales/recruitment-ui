import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { CandidateForm } from '../../../components/dashboard/candidates';
import useSettings from '../../../hooks/useSettings';
import ArrowLeftIcon from '../../../icons/ArrowLeft';
import ChevronRightIcon from '../../../icons/ChevronRight';

const CandidateCreate: React.FC = () => {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>NSC: Create candidate</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Create candidate
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<ArrowLeftIcon fontSize="small" />}
                  sx={{ m: 1, fontSize: { lg: 14, md: 13, sm: 12, xs: 11 } }}
                  to="/app/candidates"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightIcon fontSize="small" />}
              sx={{ mt: 1 }}
            >
              <Link color="textPrimary" component={RouterLink} to="/app" variant="subtitle2">
                Dashboard
              </Link>
              <Link color="textPrimary" component={RouterLink} to="/app/candidates" variant="subtitle2">
                Candidates
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Create
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ mt: 3 }}>
            <CandidateForm />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CandidateCreate;
