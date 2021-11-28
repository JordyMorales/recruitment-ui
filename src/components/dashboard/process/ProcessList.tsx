import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardHeader, CardContent, Chip, Grid, Typography } from '@mui/material';
import { Process } from '../../../types/process';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '../../../icons/ArrowRight';
import AnimatedLogo from '../../../icons/AnimatedLogo';
import { processActions } from '../../../store/process/actions';

interface ProcessListProps {
  processes: Process[];
  isLoading: boolean;
}

const ProcessList: React.FC<ProcessListProps> = ({ processes, isLoading }) => {
  const dispatch = useDispatch();

  if (isLoading)
    return (
      <div>
        <Box
          sx={{
            alignItems: 'center',
            // backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            left: 0,
            p: 3,
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 2000,
          }}
        >
          <AnimatedLogo />
        </Box>
      </div>
    );

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {processes.map((process, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
          <Card>
            <CardHeader
              action={
                <IconButton
                  aria-label="settings"
                  component={RouterLink}
                  onClick={() => dispatch(processActions.setProcess(process))}
                  to={`/app/processes/${process.processId}`}
                >
                  <ArrowRightIcon />
                </IconButton>
              }
              title={
                <Typography sx={{ fontSize: { xl: 24, lg: 19, md: 17, sm: 16, xs: 15 } }}>
                  {process.name}
                </Typography>
              }
              subheader={
                process.code
                // <Typography variant="caption" sx={{ fontSize: { lg: 15, md: 14, sm: 13, xs: 12 } }}>
                //   {process.personalData?.email}
                // </Typography>
              }
            />
            <CardContent
              sx={{
                width: '100%',
                overflow: 'auto',
                whiteSpace: 'nowrap',
                '::-webkit-scrollbar': {
                  height: '3px',
                },
                '::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(145, 158, 171, 0.24)',
                },
                '::-webkit-scrollbar-thumb:horizontal': {
                  backgroundColor: 'rgba(145, 158, 171, 0.24)',
                },
              }}
            >
              {process.steps.map((step, index) => (
                <Chip
                  key={index}
                  label={
                    <Typography sx={{ fontSize: { lg: 11, md: 11, sm: 11, xs: 10 } }}>
                      {step.name}
                    </Typography>
                  }
                  sx={{ mr: 0.3 }}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProcessList;
