import React, { useState } from 'react';
import { Card, CardHeader, CardContent, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import PlusIcon from '../../../icons/Plus';
import DeleteIcon from '@mui/icons-material/Delete';
import StepModal from './StepModal';

interface StepsProps {
  steps: any[];
  onChange: (value: any[]) => void;
}

const Steps: React.FC<StepsProps> = (props) => {
  const { steps, onChange, ...other } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState({});

  const addStep = (step) => {
    const result = [...steps];
    onChange([...result, step]);
  };

  const remove = (index) => {
    const result = [...steps];
    result.splice(index, 1);
    onChange(result);
  };

  const reorder = (list, startIndex, endIndex): any[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDragEnd = async ({ source, destination, draggableId }: DropResult): Promise<void> => {
    try {
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;
      onChange(reorder(steps, source.index, destination.index));
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card {...other}>
          <CardHeader
            title="Steps Orders"
            action={
              <IconButton
                aria-label="add"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <PlusIcon />
              </IconButton>
            }
          />
          <Droppable droppableId="Steps">
            {(droppableProvided) => (
              <CardContent {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                {steps.map((step, index) => (
                  <Draggable key={step.stepId} draggableId={step.stepId} index={index}>
                    {(draggableProvided) => (
                      <Card
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        sx={{ m: 2 }}
                      >
                        <CardHeader
                          title={step.name}
                          action={
                            <IconButton aria-label="remove" onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        />
                        <CardContent>
                          <div>{step.description}</div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </CardContent>
            )}
          </Droppable>
        </Card>
      </DragDropContext>
      <StepModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(!isOpen)}
        values={current}
        onSave={(values) => {
          addStep(values);
          setCurrent({});
        }}
      />
    </>
  );
};

export default Steps;
