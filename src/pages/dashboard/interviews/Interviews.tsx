import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';

import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import ChevronRightIcon from '../../../icons/ChevronRight';
import PlusIcon from '../../../icons/Plus';

const Interviews: React.FC = () => {
  const mounted = useMounted();
  const { settings } = useSettings();

  useEffect(() => {
    if (mounted) {
    }
  }, [mounted]);

  return (
    <>
      <Helmet>
        <title>Dashboard: Interviews List</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
              Interviews
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon />}
                  sx={{ m: 1 }}
                  onClick={() => {}}
                  variant="contained"
                >
                  New Interview
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
              <Typography color="textSecondary" variant="subtitle2">
                Interviews
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ mt: 3 }}>{/* <UserListTable users={users} isLoading={isLoading} /> */}</Box>
        </Container>
      </Box>
      {/* <UserModal isOpen={isOpen} handleClose={handleClose} updateForm={false} /> */}
    </>
  );
};

export default Interviews;