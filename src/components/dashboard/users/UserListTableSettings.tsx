import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import parsePhoneNumber from 'libphonenumber-js';

const stateColor: any = {
  ACTIVE: '#4caf50',
  INACTIVE: '#ffb74d',
  ARCHIVED: '#f57c00',
  REMOVED: '#ff3d00',
};

const getFlag = (countryCode: any) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

export const columns: GridColDef[] = [  
  { field: 'userId', headerName: 'Id', width: 150, hide: true },
  { field: 'firstName', headerName: 'FirstName', width: 100 },
  { field: 'middleName', headerName: 'MiddleName', width: 100, hide: true },
  { field: 'lastName', headerName: 'LastName', width: 120 },
  {
    field: 'email',
    headerName: 'Email',
    width: 280,
    renderCell: (params: GridRenderCellParams<any>) => (
      <button
        style={{
          background: '#6b778c',
          color: '#fff',
          border: 'none',
          borderRadius: '16px',
          height: '28px',
          cursor: 'pointer',
          padding: '0 12px',
        }}
        onClick={() => window.open(`mailto:${params.value}`)}
      >
        {params.value}
      </button>
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
  { field: 'dateOfBirth', headerName: 'Date Of Birth', width: 150, hide: true },
  { field: 'country', headerName: 'Country', width: 150 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'address', headerName: 'Address', width: 150, hide: true },
  { field: 'photoUrl', headerName: 'Photo Url', width: 150, hide: true },
  { field: 'resumeUrl', headerName: 'Resume Url', width: 150, hide: true },
  { field: 'jobTitle', headerName: 'Job Title', width: 150, hide: true },
  {
    field: 'role',
    headerName: 'Role',
    width: 120,
    renderCell: (params: GridRenderCellParams<any>) => (
      <button
        style={{
          background: '#293142',
          color: '#fff',
          border: 'none',
          borderRadius: '16px',
          height: '28px',
          padding: '0 12px',
        }}
      >
        {params.value}
      </button>
    ),
  },
  {
    field: 'state',
    headerName: 'State',
    width: 120,
    renderCell: (params: GridRenderCellParams<any>) => (
      <button
        style={{
          background: stateColor[params.value],
          color: '#fff',
          border: 'none',
          borderRadius: '16px',
          height: '28px',
          padding: '0 12px',
        }}
      >
        {params.value}
      </button>
    ),
  },
];
