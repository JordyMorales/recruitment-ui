import { Chip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import parsePhoneNumber from 'libphonenumber-js';

const getFlag = (countryCode: any) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

export const columns: GridColDef[] = [
  { field: 'candidateId', headerName: 'Id', width: 150, hide: true },
  { field: 'firstName', headerName: 'First Name', width: 100 },
  { field: 'middleName', headerName: 'Middle Name', width: 100, hide: true },
  { field: 'lastName', headerName: 'Last Name', width: 120 },
  {
    field: 'email',
    headerName: 'Email',
    width: 280,
    renderCell: (params: GridRenderCellParams<any>) => (
      <Chip
        size="small"
        label={params.value}
        color="default"
        variant="outlined"
        onClick={() => window.open(`mailto:${params.value}`)}
      />
    ),
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.value) {
        const phoneNumber = parsePhoneNumber(params.value);
        return (
          <>
            {getFlag(phoneNumber?.country)} {phoneNumber?.nationalNumber}
          </>
        );
      }
    },
  },
  { field: 'address', headerName: 'Address', width: 100, hide: true },
  { field: 'city', headerName: 'City', width: 100, hide: true },
  { field: 'country', headerName: 'Country', width: 120 },
  { field: 'englishLevel', headerName: 'English Level', width: 120 },
  { field: 'engineeringLevel', headerName: 'Engineering Level', width: 120, hide: true },
  { field: 'salaryPretension', headerName: 'Salary Pretension', width: 120 },
  { field: 'contractPreference', headerName: 'Contract Preference', width: 120, hide: true },
  { field: 'company', headerName: 'Company', width: 120 },
  { field: 'resumeUrl', headerName: 'Resume Url', width: 120, hide: true },
  { field: 'seniority:', headerName: 'Seniority:', width: 120 },
  { field: 'tags', headerName: 'Tags', width: 120 },
  { field: 'links', headerName: 'Links', width: 120, hide: true },
  { field: 'phones', headerName: 'Phones', width: 120, hide: true },
  {
    field: 'tags',
    headerName: 'Tags',
    width: 300,
    renderCell: (params: GridRenderCellParams<any>) =>
      params.value.map((tag) => (
        <button
          style={{
            backgroundColor: tag.color,
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            height: '28px',
            cursor: 'pointer',
            padding: '0 12px',
          }}
        >
          {tag.name}
        </button>
      )),
  },
  { field: 'emails', headerName: 'Emails', width: 120, hide: true },
  {
    field: 'technologies',
    headerName: 'Technologies',
    width: 300,
    renderCell: (params: GridRenderCellParams<any>) =>
      params.value.map((technology) => (
        <button
          style={{
            backgroundColor: '#6b778c',
            color: '#fff',
            border: 'none',
            borderRadius: '16px',
            height: '28px',
            cursor: 'pointer',
            padding: '0 12px',
          }}
        >
          {technology.name}
        </button>
      )),
  },
  { field: 'referralBy', headerName: 'Referral By', width: 120, hide: true },
  { field: 'createdBy', headerName: 'Created By', width: 120, hide: true },
  { field: 'updatedBy', headerName: 'Updated By', width: 120, hide: true },
  { field: 'createdAt', headerName: 'Created At', width: 120, hide: true },
  { field: 'updatedAt', headerName: 'Updated At', width: 120, hide: true },
];
