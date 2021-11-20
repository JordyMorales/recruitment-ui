import React from 'react';
import { useDispatch } from 'react-redux';
import { EditTwoTone, ForwardTwoTone } from '@mui/icons-material';
import { DataGrid, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid';
import { candidateActions } from '../../../store/candidate/actions';
import { columns } from './CandidateListTableSettings';
import { Candidate } from '../../../types/candidate';

interface CandidateListTableProps {
  candidates: Candidate[];
  isLoading: boolean;
}

const CandidateListTable: React.FC<CandidateListTableProps> = ({ candidates, isLoading }) => {
  const dispatch = useDispatch();

  const rows: GridRowsProp = candidates.map((candidate) => ({
    ...candidate,
    ...candidate.personalData,
    id: candidate.candidateId,
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
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    dispatch(candidateActions.setCandidate(params.row));
                    dispatch(candidateActions.showModal());
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

export default CandidateListTable;
