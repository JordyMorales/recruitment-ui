import {
  uiStuffTypes,
  createCandidateTypes,
  getAllCandidatesTypes,
  getCandidateByIdTypes,
  getCandidateProfileTypes,
  updateCandidateTypes,
  createCandidateProfileTypes,
  updateCandidateProfileTypes,
  applyForJobTypes,
  updateApplicationTypes,
  getCandidateApplicationsTypes,
} from './constants';

export const candidateActions = {
  setCandidate: (payload: any) => ({
    type: uiStuffTypes.SET_CANDIDATE,
    payload,
  }),
  clearCandidate: () => ({
    type: uiStuffTypes.CLEAR_CANDIDATE,
  }),
  createCandidateRequest: (payload: any) => ({
    type: createCandidateTypes.REQUEST,
    payload,
  }),
  createCandidateSuccess: (payload: any) => ({
    type: createCandidateTypes.SUCCESS,
    payload,
  }),
  createCandidateFailure: (error: string) => ({
    type: createCandidateTypes.FAILURE,
    payload: error,
  }),
  getAllCandidatesRequest: () => ({
    type: getAllCandidatesTypes.REQUEST,
  }),
  getAllCandidatesSuccess: (payload: any) => ({
    type: getAllCandidatesTypes.SUCCESS,
    payload,
  }),
  getAllCandidatesFailure: (error: string) => ({
    type: getAllCandidatesTypes.FAILURE,
    payload: error,
  }),
  getCandidateByIdRequest: (payload: any) => ({
    type: getCandidateByIdTypes.REQUEST,
    payload,
  }),
  getCandidateByIdSuccess: (payload: any) => ({
    type: getCandidateByIdTypes.SUCCESS,
    payload,
  }),
  getCandidateByIdFailure: (error: string) => ({
    type: getCandidateByIdTypes.FAILURE,
    payload: error,
  }),
  getCandidateProfileRequest: (payload: any) => ({
    type: getCandidateProfileTypes.REQUEST,
    payload,
  }),
  getCandidateProfileSuccess: (payload: any) => ({
    type: getCandidateProfileTypes.SUCCESS,
    payload,
  }),
  getCandidateProfileFailure: (error: string) => ({
    type: getCandidateProfileTypes.FAILURE,
    payload: error,
  }),
  updateCandidateRequest: (payload: any) => ({
    type: updateCandidateTypes.REQUEST,
    payload,
  }),
  updateCandidateSuccess: (payload: any) => ({
    type: updateCandidateTypes.SUCCESS,
    payload,
  }),
  updateCandidateFailure: (error: string) => ({
    type: updateCandidateTypes.FAILURE,
    payload: error,
  }),

  createCandidateProfileRequest: (payload: any) => ({
    type: createCandidateProfileTypes.REQUEST,
    payload,
  }),
  createCandidateProfileSuccess: (payload: any) => ({
    type: createCandidateProfileTypes.SUCCESS,
    payload,
  }),
  createCandidateProfileFailure: (error: string) => ({
    type: createCandidateProfileTypes.FAILURE,
    payload: error,
  }),

  updateCandidateProfileRequest: (payload: any) => ({
    type: updateCandidateProfileTypes.REQUEST,
    payload,
  }),
  updateCandidateProfileSuccess: (payload: any) => ({
    type: updateCandidateProfileTypes.SUCCESS,
    payload,
  }),
  updateCandidateProfileFailure: (error: string) => ({
    type: updateCandidateProfileTypes.FAILURE,
    payload: error,
  }),
  applyForJobRequest: (payload: any) => ({
    type: applyForJobTypes.REQUEST,
    payload,
  }),
  applyForJobSuccess: (payload: any) => ({
    type: applyForJobTypes.SUCCESS,
    payload,
  }),
  applyForJobFailure: (error: string) => ({
    type: applyForJobTypes.FAILURE,
    payload: error,
  }),
  updateApplicationRequest: (payload: any) => ({
    type: updateApplicationTypes.REQUEST,
    payload,
  }),
  updateApplicationSuccess: (payload: any) => ({
    type: updateApplicationTypes.SUCCESS,
    payload,
  }),
  updateApplicationFailure: (error: string) => ({
    type: updateApplicationTypes.FAILURE,
    payload: error,
  }),
  getCandidateApplicationsRequest: (payload: any) => ({
    type: getCandidateApplicationsTypes.REQUEST,
    payload,
  }),
  getCandidateApplicationsSuccess: (payload: any) => ({
    type: getCandidateApplicationsTypes.SUCCESS,
    payload,
  }),
  getCandidateApplicationsFailure: (error: string) => ({
    type: getCandidateApplicationsTypes.FAILURE,
    payload: error,
  }),
};
