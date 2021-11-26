import {
  uiStuffTypes,
  createCandidateTypes,
  getAllCandidatesTypes,
  getCandidateByIdTypes,
  getCandidateProfileTypes,
  updateCandidateTypes,
  updateCandidateProfileTypes,
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
};