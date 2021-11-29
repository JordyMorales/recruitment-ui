import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import numeral from 'numeral';
import parsePhoneNumber from 'libphonenumber-js';
import { Candidate } from '../../../types/candidate';
import { getFlag } from '../../../utils';

interface CandidateContactDetailsProps {
  candidate: Candidate;
}
const CandidateContactDetails: React.FC<CandidateContactDetailsProps> = ({ candidate }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item md={5} xl={4} xs={12}>
          <Card>
            <CardHeader title="Personal Information" />
            <Divider />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Candidate
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div>{`${candidate.personalData.firstName} ${candidate.personalData.middleName ?? ''} ${
                      candidate.personalData.lastName
                    }`}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>{candidate.personalData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Phone
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {candidate.personalData.phone &&
                      `${getFlag(parsePhoneNumber(candidate.personalData.phone)?.country)} ${
                        candidate.personalData.phone
                      }`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Birthday
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {format(new Date(candidate.personalData.dateOfBirth), 'dd MMM yyyy')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      City
                    </Typography>
                  </TableCell>
                  <TableCell>{candidate.personalData.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Country
                    </Typography>
                  </TableCell>
                  <TableCell>{candidate.personalData.country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Address
                    </Typography>
                  </TableCell>
                  <TableCell>{candidate.personalData.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Created At
                    </Typography>
                  </TableCell>
                  <TableCell>{format(new Date(candidate.createdAt), 'dd MMM yyyy | HH:mm')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
        <Grid item md={7} xl={8} xs={12}>
          <Card>
            <CardHeader title="Professional Information" />
            <Divider />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Technologies
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {candidate.technologies.map((technology) => (
                      <Chip label={technology.name} sx={{ mr: 0.5, mt: 0.5 }} />
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Links
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {candidate.links.map((link) => (
                      <Chip label={link} sx={{ mr: 0.5, mt: 0.5 }} />
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Company
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div>{candidate.company}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Job Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div>{candidate.jobTitle}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Seniority
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div>{candidate.seniority}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Contract Preference
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <div>{candidate.contractPreference}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Salary Pretention
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {numeral(candidate.salaryPretension).format(`${candidate.salaryPretension}0,0.00`)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Extra Information" />
            <Divider />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Tags
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {candidate.tags.map((tag) => (
                      <Chip
                        label={tag.name}
                        sx={{ mr: 0.5, mt: 0.5, background: tag.color, color: '#FFFFFF' }}
                      />
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Extra Emails
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {candidate.emails.map((email) => (
                      <Chip label={email} sx={{ mr: 0.5, mt: 0.5 }} />
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Extra Phones
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {candidate.phones.map((phone) => (
                      <Chip label={phone} sx={{ mr: 0.5, mt: 0.5 }} />
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateContactDetails;
