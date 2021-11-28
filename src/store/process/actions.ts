import {
  uiStuffTypes,
  createProcessTypes,
  getAllProcessesTypes,
  getProcessByIdTypes,
  updateProcessTypes,
} from './constants';

export const processActions = {
  setProcess: (payload: any) => ({
    type: uiStuffTypes.SET_PROCESS,
    payload,
  }),
  clearProcess: () => ({
    type: uiStuffTypes.CLEAR_PROCESS,
  }),
  showModal: () => ({
    type: uiStuffTypes.SHOW_MODAL,
  }),
  hiModal: () => ({
    type: uiStuffTypes.HIDE_MODAL,
  }),
  createProcessRequest: (payload: any) => ({
    type: createProcessTypes.REQUEST,
    payload,
  }),
  createProcessSuccess: (payload: any) => ({
    type: createProcessTypes.SUCCESS,
    payload,
  }),
  createProcessFailure: (error: string) => ({
    type: createProcessTypes.FAILURE,
    payload: error,
  }),
  getAllProcessesRequest: () => ({
    type: getAllProcessesTypes.REQUEST,
  }),
  getAllProcessesSuccess: (payload: any) => ({
    type: getAllProcessesTypes.SUCCESS,
    payload,
  }),
  getAllProcessesFailure: (error: string) => ({
    type: getAllProcessesTypes.FAILURE,
    payload: error,
  }),
  getProcessByIdRequest: (payload: any) => ({
    type: getProcessByIdTypes.REQUEST,
    payload,
  }),
  getProcessByIdSuccess: (payload: any) => ({
    type: getProcessByIdTypes.SUCCESS,
    payload,
  }),
  getProcessByIdFailure: (error: string) => ({
    type: getProcessByIdTypes.FAILURE,
    payload: error,
  }),
  updateProcessRequest: (payload: any) => ({
    type: updateProcessTypes.REQUEST,
    payload,
  }),
  updateProcessSuccess: (payload: any) => ({
    type: updateProcessTypes.SUCCESS,
    payload,
  }),
  updateProcessFailure: (error: string) => ({
    type: updateProcessTypes.FAILURE,
    payload: error,
  }),
};
