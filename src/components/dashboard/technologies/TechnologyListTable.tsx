import React from 'react';
import { useDispatch } from 'react-redux';
import { EditTwoTone } from '@mui/icons-material';
import { DataGrid, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { technologyActions } from '../../../store/technology/actions';
import { columns } from './TechnologyListTableSettings';
import { Technology } from '../../../types/technology';

interface TechnologyListTableProps {
  technologies: Technology[];
  isLoading: boolean;
}

const TechnologyListTable: React.FC<TechnologyListTableProps> = ({ technologies, isLoading }) => {
  const dispatch = useDispatch();

  const rows: GridRowsProp = technologies.map((technology) => ({
    ...technology,
    id: technology.technologyId,
  }));

  return (
    <div style={{ height: '68vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={[
          {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            renderCell: (params: GridRenderCellParams<any>) => (
              <>
                <EditTwoTone
                  onClick={() => {
                    dispatch(technologyActions.setTechnology(params.row));
                    dispatch(technologyActions.showModal());
                  }}
                />
              </>
            ),
          },
          ...columns,
        ]}
        loading={isLoading}
      />
    </div>
  );
};

export default TechnologyListTable;
