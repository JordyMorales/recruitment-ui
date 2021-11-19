import React from 'react';
import { useDispatch } from 'react-redux';
import { EditTwoTone, ForwardTwoTone } from '@mui/icons-material';
import { DataGrid, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { userActions } from '../../../store/user/actions';
import { columns } from './UserListTableSettings';
import { User } from '../../../types/user';

interface UserListTableProps {
  users: User[];
  isLoading: boolean;
}

const UserListTable: React.FC<UserListTableProps> = ({ users, isLoading }) => {
  const dispatch = useDispatch();

  const rows: GridRowsProp = users.map((user) => ({ ...user, id: user.userId }));

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
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    dispatch(userActions.setUser(params.row));
                    dispatch(userActions.showModal());
                  }}
                />
                <ForwardTwoTone onClick={() => console.log(params.row)} />
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

export default UserListTable;
