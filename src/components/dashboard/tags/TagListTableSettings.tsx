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
      <button
        style={{
          background: params.row.color,
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
    field: 'isActive',
    headerName: 'Active',
    width: 100,
    renderCell: (params: GridRenderCellParams<any>) => (
      <button
        style={{
          background: color[params.value],
          color: '#fff',
          border: 'none',
          borderRadius: '16px',
          height: '28px',
          padding: '0 12px',
        }}
      >
        {params.value ? 'ACTIVE' : 'INACTIVE'}
      </button>
    ),
  },
];
