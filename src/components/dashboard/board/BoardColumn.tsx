import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { Column } from '../../../store/board/type';
import BoardCard from './BoardCard';

interface BoardColumnProps {
  column: Column;
}

const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  const { column } = props;

  return (
    <div>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100%',
          mx: 1,
          overflowX: 'hidden',
          overflowY: 'hidden',
          width: { xs: 300, sm: 380 },
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            px: 2,
            py: 1,
          }}
        >
          <Typography color="inherit" variant="h6">
            {column.name}
          </Typography>
        </Box>
        <Divider />
        <Droppable droppableId={column.stepId} type="card">
          {(provided): JSX.Element => (
            <Box
              ref={provided.innerRef}
              sx={{
                flexGrow: 1,
                minHeight: 80,
                overflowY: 'auto',
                px: 2,
                py: 1,
              }}
            >
              {column.applications.map((application, index) => (
                <Draggable
                  draggableId={application.applicationId}
                  index={index}
                  key={application.applicationId}
                >
                  {(_provided, snapshot): JSX.Element => (
                    <BoardCard
                      card={application}
                      dragging={snapshot.isDragging}
                      index={index}
                      key={application.applicationId}
                      column={column}
                      ref={_provided.innerRef}
                      style={{ ..._provided.draggableProps.style }}
                      {..._provided.draggableProps}
                      {..._provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Paper>
    </div>
  );
};

export default BoardColumn;
