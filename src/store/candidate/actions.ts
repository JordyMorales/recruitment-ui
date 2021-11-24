import {
  uiStuffTypes,
  createCandidateTypes,
  getAllCandidatesTypes,
  getCandidateByIdTypes,
  updateCandidateTypes,
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
};
