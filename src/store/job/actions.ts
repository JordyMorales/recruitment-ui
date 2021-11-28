import {
  uiStuffTypes,
  createJobTypes,
  getAllJobsTypes,
  getJobByIdTypes,
  updateJobTypes,
} from './constants';

export const jobActions = {
  setJob: (payload: any) => ({
    type: uiStuffTypes.SET_JOB,
    payload,
  }),
  clearJob: () => ({
    type: uiStuffTypes.CLEAR_JOB,
  }),
  showModal: () => ({
    type: uiStuffTypes.SHOW_MODAL,
  }),
  hiModal: () => ({
    type: uiStuffTypes.HIDE_MODAL,
  }),
  createJobRequest: (payload: any) => ({
    type: createJobTypes.REQUEST,
    payload,
  }),
  createJobSuccess: (payload: any) => ({
    type: createJobTypes.SUCCESS,
    payload,
  }),
  createJobFailure: (error: string) => ({
    type: createJobTypes.FAILURE,
    payload: error,
  }),
  getAllJobsRequest: () => ({
    type: getAllJobsTypes.REQUEST,
  }),
  getAllJobsSuccess: (payload: any) => ({
    type: getAllJobsTypes.SUCCESS,
    payload,
  }),
  getAllJobsFailure: (error: string) => ({
    type: getAllJobsTypes.FAILURE,
    payload: error,
  }),
  getJobByIdRequest: (payload: any) => ({
    type: getJobByIdTypes.REQUEST,
    payload,
  }),
  getJobByIdSuccess: (payload: any) => ({
    type: getJobByIdTypes.SUCCESS,
    payload,
  }),
  getJobByIdFailure: (error: string) => ({
    type: getJobByIdTypes.FAILURE,
    payload: error,
  }),
  updateJobRequest: (payload: any) => ({
    type: updateJobTypes.REQUEST,
    payload,
  }),
  updateJobSuccess: (payload: any) => ({
    type: updateJobTypes.SUCCESS,
    payload,
  }),
  updateJobFailure: (error: string) => ({
    type: updateJobTypes.FAILURE,
    payload: error,
  }),
};
