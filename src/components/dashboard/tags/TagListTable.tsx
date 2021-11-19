import React from 'react';
import { useDispatch } from 'react-redux';
import { EditTwoTone } from '@mui/icons-material';
import { DataGrid, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { tagActions } from '../../../store/tag/actions';
import { columns } from './TagListTableSettings';
import { Tag } from '../../../types/tag';

interface TagListTableProps {
  tags: Tag[];
  isLoading: boolean;
}

const TagListTable: React.FC<TagListTableProps> = ({ tags, isLoading }) => {
  const dispatch = useDispatch();

  const rows: GridRowsProp = tags.map((tag) => ({ ...tag, id: tag.tagId }));

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
                    dispatch(tagActions.setTag(params.row));
                    dispatch(tagActions.showModal());
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

export default TagListTable;
