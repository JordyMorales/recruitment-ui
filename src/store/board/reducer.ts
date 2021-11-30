import { getBoardTypes, moveCardTypes } from './constants';

import { BoardState } from './type';

const initialState: BoardState = {
  isOpen: false,
  isLoading: false,
  shouldClose: false,
  isSuccessful: false,
  error: '',
  isLoaded: false,
  columns: [],
};

const boardReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case getBoardTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getBoardTypes.SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        columns: payload,
      };

    case getBoardTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case moveCardTypes.REQUEST:
      const { applicationId, position, columnId } = payload;

      let sourceColumnId = null;
      let move = null;

      let columns = state.columns.reduce((acc, step) => {
        const applications = step.applications.filter((application) => {
          if (application.applicationId === applicationId) {
            move = application;
            sourceColumnId = step.stepId;
            return false;
          }
          return true;
        });
        return [...acc, { ...step, applications }];
      }, []);

      const newColumns = columns.reduce((acc, step) => {
        if (step.stepId === columnId)
          step.applications.splice(position, 0, { ...move, step: { stepId: columnId } });
        if (!columnId && step.stepId === sourceColumnId)
          step.applications.splice(position, 0, { ...move, step: { stepId: columnId } });
        return [...acc, { ...step }];
      }, []);

      return {
        ...state,
        isLoading: true,
        columns: newColumns,
      };

    case moveCardTypes.SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        columns: payload,
      };

    case moveCardTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default boardReducer;
