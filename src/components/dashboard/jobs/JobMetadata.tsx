import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, List, ListItem, Typography } from '@mui/material';

interface JobMetadataProps {
  startDate: Date;
  vacancies: number;
  state: string;
  createdAt: Date;
}

const JobMetadata: React.FC<JobMetadataProps> = (props) => {
  const { vacancies, state, startDate, createdAt, ...other } = props;

  return (
    <Card {...other}>
      <CardContent sx={{ pt: 0 }}>
        <List>
          <ListItem
            disableGutters
            divider
            sx={{
              justifyContent: 'space-between',
              padding: 2,
            }}
          >
            <Typography color="textPrimary" variant="subtitle2">
              Start date
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {format(new Date(startDate), 'dd MMM yyyy')}
            </Typography>
          </ListItem>
          <ListItem
            disableGutters
            divider
            sx={{
              justifyContent: 'space-between',
              padding: 2,
            }}
          >
            <Typography color="textPrimary" variant="subtitle2">
              Vacancies
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {vacancies}
            </Typography>
          </ListItem>
          <ListItem
            disableGutters
            divider
            sx={{
              justifyContent: 'space-between',
              padding: 2,
            }}
          >
            <Typography color="textPrimary" variant="subtitle2">
              state
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {state}
            </Typography>
          </ListItem>
          {createdAt && (
            <ListItem
              disableGutters
              sx={{
                justifyContent: 'space-between',
                padding: 2,
              }}
            >
              <Typography color="textPrimary" variant="subtitle2">
                Created At
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {format(new Date(createdAt), 'dd MMM yyyy')}
              </Typography>
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default JobMetadata;
