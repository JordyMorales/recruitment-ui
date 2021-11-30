import React from 'react';
import Markdown from 'react-markdown';
import { Box, Card, CardContent, Chip, Grid, Typography, styled } from '@mui/material';
import rehypeRaw from 'rehype-raw';

interface JobBriefProps {
  name: string;
  description: string;
  technologies: any[];
}

const MarkdownWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  '& p': {
    marginBottom: theme.spacing(2),
  },
}));

const JobBrief: React.FC<JobBriefProps> = (props) => {
  const { description, technologies, name, ...other } = props;

  return (
    <Card {...other}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography color="textSecondary" variant="overline">
              Job Title
            </Typography>
            <Typography color="textPrimary" variant="subtitle2">
              {name}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography color="textSecondary" variant="overline">
                Technologies
              </Typography>
              <Box sx={{ mt: 1 }}>
                {technologies.map((technology) => (
                  <Chip
                    key={technology.technologyId}
                    label={
                      <Typography sx={{ fontSize: { lg: 11, md: 11, sm: 11, xs: 10 } }}>
                        {technology.name}
                      </Typography>
                    }
                    sx={{ mr: 0.3 }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography color="textSecondary" sx={{ mb: 2 }} variant="overline">
            Description
          </Typography>
          <MarkdownWrapper>
            <Markdown rehypePlugins={[rehypeRaw]} children={description} />
          </MarkdownWrapper>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobBrief;
