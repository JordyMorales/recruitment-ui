import {
  uiStuffTypes,
  createProcessTypes,
  getAllProcessesTypes,
  getProcessByIdTypes,
  updateProcessTypes,
} from './constants';

import { ProcessState, emptyProcess } from './types';

const initialState: ProcessState = {
  isOpen: false,
  shouldClose: false,
  error: '',
  isLoading: false,
  process: emptyProcess,
  list: {
    initialLoading: true,
    isLoading: false,
    totalItems: 0,
    processes: [],
    totalPages: 0,
    currentPage: 0,
  },
};

const processReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case uiStuffTypes.SET_PROCESS:
      return {
        ...state,
        process: payload,
      };
    case uiStuffTypes.CLEAR_PROCESS:
      return {
        ...state,
        process: emptyProcess,
      };
    case uiStuffTypes.SHOW_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case uiStuffTypes.HIDE_MODAL:
      return {
        ...state,
        isOpen: false,
        shouldClose: false,
        process: emptyProcess,
      };

    case createProcessTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createProcessTypes.SUCCESS:
      return {
        ...state,
        process: emptyProcess,
        list: {
          ...state.list,
          totalItems: state.list.totalItems + 1,
          processes: [payload, ...state.list.processes],
        },
        isLoading: false,
        shouldClose: true,
      };

    case createProcessTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getAllProcessesTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getAllProcessesTypes.SUCCESS:
      return {
        ...state,
        list: {
          processes: payload,
          isLoading: false,
          initialLoading: false,
        },
      };

    case getAllProcessesTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case getProcessByIdTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getProcessByIdTypes.SUCCESS:
      return {
        ...state,
        process: payload,
        isLoading: false,
      };

    case getProcessByIdTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case updateProcessTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateProcessTypes.SUCCESS:
      const index = state.list.processes.findIndex((process) => process.processId === payload.processId);
      return {
        ...state,
        process: emptyProcess,
        list: {
          ...state.list,
          processes: [
            ...state.list.processes.slice(0, index),
            { ...state.list.processes[index], ...payload },
            ...state.list.processes.slice(index + 1),
          ],
        },
        isLoading: false,
        shouldClose: true,
      };

    case updateProcessTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default processReducer;
