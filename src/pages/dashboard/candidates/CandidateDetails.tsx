import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import useMounted from '../../../hooks/useMounted';
import useSettings from '../../../hooks/useSettings';
import PencilAltIcon from '../../../icons/PencilAlt';
import {
  CandidateApplications,
  CandidateComments,
  CandidateContactDetails,
} from '../../../components/dashboard/candidates';
import { RootState } from '../../../store/rootReducer';
import { candidateActions } from '../../../store/candidate/actions';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Applications', value: 'applications' },
  { label: 'Comments', value: 'comments' },
];

const CandidateDetails = () => {
  const mounted = useMounted();
  const dispatch = useDispatch();
  const params = useParams();

  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState<string>('details');

  const { candidate } = useSelector((state: RootState) => state.candidate);

  useEffect(() => {
    if (mounted && !candidate.candidateId) {
      dispatch(candidateActions.getCandidateByIdRequest({ candidateId: params.candidateId }));
    }
  }, [dispatch, mounted, candidate, params.candidateId]);

  const handleTabsChange = (event: React.ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard: Candidate Details</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar
                    src={candidate.personalData?.photoUrl}
                    sx={{
                      height: { xs: 50, sm: 61, md: 62, lg: 63, xl: 64 },
                      width: { xs: 50, sm: 61, md: 62, lg: 63, xl: 64 },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography color="textPrimary" sx={{}} variant="h5">
                    {`${candidate.personalData.firstName} ${candidate.personalData.lastName}`}
                  </Typography>
                  <Typography color="textSecondary" variant="h6">
                    candidate_id: <Chip size="small" label={candidate.candidateId} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PencilAltIcon />}
                  sx={{ mt: 2, ml: 1, fontSize: { lg: 14, md: 13, sm: 12, xs: 11 } }}
                  to={`/app/candidates/${params.candidateId}/edit`}
                  variant="contained"
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 1 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && <CandidateContactDetails candidate={candidate} />}
            {currentTab === 'applications' && <CandidateApplications />}
            {currentTab === 'comments' && <CandidateComments />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CandidateDetails;
