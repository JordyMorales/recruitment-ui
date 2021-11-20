import { Chip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const color: any = {
  true: '#4caf50',
  false: '#ff3d00',
};

export const columns: GridColDef[] = [
  { field: 'tagId', headerName: 'Id', width: 400 },
  {
    field: 'name',
    headerName: 'Tag',
    width: 250,
    renderCell: (params: GridRenderCellParams<any>) => (
      <Chip
        size="small"
        label={params.value}
        style={{
          backgroundColor: params.row.color,
          color: '#FFFFFF',
        }}
      />
    ),
  },
  {
    field: 'isActive',
    headerName: 'Active',
    width: 100,
    renderCell: (params: GridRenderCellParams<any>) => (
      <Chip
        size="small"
        label={params.value ? 'ACTIVE' : 'INACTIVE'}
        style={{
          background: color[params.value],
          color: '#FFFFFF',
        }}
      />
    ),
  },
];
