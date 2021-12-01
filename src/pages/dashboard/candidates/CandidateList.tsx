import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { RootState } from '../../../store/rootReducer';
import { candidateActions } from '../../../store/candidate/actions';
import { CandidateListView } from '../../../components/dashboard/candidates';

import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import ChevronRightIcon from '../../../icons/ChevronRight';
import PlusIcon from '../../../icons/Plus';
import Guard from '../../../components/Guard';

const CandidateList: React.FC = () => {
  const dispatch = useDispatch();
  const mounted = useMounted();
  const { settings } = useSettings();

  const {
    list: { candidates, isLoading, initialLoading },
  } = useSelector((state: RootState) => state.candidate);

  useEffect(() => {
    if (mounted && initialLoading) {
      dispatch(candidateActions.getAllCandidatesRequest());
    }
  }, [dispatch, mounted, initialLoading]);

  return (
    <>
      <Helmet>
        <title>NSC: Candidates List</title>
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
                Candidates
              </Typography>
            </Grid>
            <Guard roles={['ADMIN', 'RECRUITER', 'INTERVIEWER']}>
              <Grid item>
                <Box sx={{ m: -1 }}>
                  <Button
                    color="primary"
                    component={RouterLink}
                    startIcon={<PlusIcon fontSize="small" />}
                    sx={{ m: 1, fontSize: { lg: 14, md: 13, sm: 12, xs: 11 } }}
                    to="/app/candidates/new"
                    variant="contained"
                    onClick={() => dispatch(candidateActions.clearCandidate())}
                  >
                    New Candidate
                  </Button>
                </Box>
              </Grid>
            </Guard>
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
                List
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ mt: 3 }}>
            <CandidateListView candidates={candidates} isLoading={isLoading} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CandidateList;
