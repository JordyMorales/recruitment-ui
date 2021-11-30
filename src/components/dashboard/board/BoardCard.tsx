import React from 'react';
import { format } from 'date-fns';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Column } from '../../../store/board/type';
import { Application } from '../../../types/application';

interface BoardCardProps {
  card: Application;
  dragging: boolean;
  index?: number;
  column: Column;
  style?: Record<any, any>;
}

const BoardCard = React.forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
  const { card, dragging, column, ...other } = props;

  return (
    <Box ref={ref} sx={{ outline: 'none', py: 1 }} {...other}>
      <Card
        raised={dragging}
        sx={{
          ...(dragging && { backgroundColor: 'background.paper' }),
          '&:hover': { backgroundColor: 'background.default' },
        }}
        variant={dragging ? 'elevation' : 'outlined'}
      >
        <CardContent>
          <Typography color="textPrimary" variant="subtitle2">
            {card.appliedBy.firstName} {card.appliedBy.lastName}
          </Typography>

          <Typography color="textSecondary" variant="subtitle2">
            Applied at {format(new Date(card.appliedAt), 'dd MMM yyyy HH:ss')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
});

export default BoardCard;
