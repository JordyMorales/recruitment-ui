import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { Box, Grid, Typography } from '@mui/material';
import CalendarIcon from '../../../icons/Calendar';
import useMounted from '../../../hooks/useMounted';
import { jobActions } from '../../../store/job/actions';
import { RootState } from '../../../store/rootReducer';
import { boardActions } from '../../../store/board/actions';
import { BoardColumn } from '../../../components/dashboard/board';
import { Column } from '../../../store/board/type';
import AnimatedLogo from '../../../icons/AnimatedLogo';

const JobBoard: React.FC = () => {
  const params = useParams();
  const mounted = useMounted();
  const dispatch = useDispatch();

  const { job } = useSelector((state: RootState) => state.job);
  const { isLoading, columns } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    if (mounted && params.jobId) {
      dispatch(jobActions.getJobByIdRequest({ jobId: params.jobId }));
      dispatch(boardActions.getBoardRequest({ jobId: params.jobId }));
    }
  }, [dispatch, mounted, params.jobId]);

  const handleDragEnd = async ({ source, destination, draggableId }: DropResult): Promise<void> => {
    try {
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;
      if (source.droppableId === destination.droppableId) {
        dispatch(boardActions.moveCardRequest({ applicationId: draggableId, position: destination.index }));
      } else {
        let current = null;
        for (const step of columns) {
          for (const application of step.applications) {
            if (application.applicationId === draggableId) {
              current = application;
              break;
            }
          }
        }
        dispatch(jobActions.updateApplicationRequest({ ...current, stepId: destination.droppableId }));
        dispatch(
          boardActions.moveCardRequest({
            applicationId: draggableId,
            position: destination.index,
            columnId: destination.droppableId,
          }),
        );
        toast.success('Card moved!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  if (isLoading)
    return (
      <Grid container sx={{ height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <AnimatedLogo />
        </Box>
      </Grid>
    );


  return (
    <>
      <Helmet>
        <title>NSC: Board</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '95%',
          overflow: 'hidden',
          marginTop: '3%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography color="textPrimary" variant="h5">
            {job.name}
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
              color: 'text.secondary',
              display: 'flex',
              flexWrap: 'wrap',
              mb: -2,
              mx: -2,
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                m: 2,
              }}
            >
              {job.startDate && (
                <>
                  <CalendarIcon fontSize="small" />
                  <Typography color="inherit" sx={{ ml: 1 }} variant="subtitle2">
                    {`Job will start in ${formatDistanceToNowStrict(new Date(job.startDate))}`}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              flexShrink: 1,
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                px: 1,
                py: 3,
              }}
            >
              {columns.map((column: Column) => (
                <BoardColumn key={column.stepId} column={column} />
              ))}
            </Box>
          </Box>
        </DragDropContext>
      </Box>
    </>
  );
};

export default JobBoard;
