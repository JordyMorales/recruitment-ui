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

import { CandidateState, emptyApplication, emptyCandidate } from './types';

const initialState: CandidateState = {
  error: '',
  isLoading: false,
  isSuccessful: false,
  account: emptyCandidate,
  application: emptyApplication,
  applications: {
    initialLoading: true,
    isLoading: false,
    applications: [],
  },
  candidate: emptyCandidate,
  list: {
    initialLoading: true,
    isLoading: false,
    totalItems: 0,
    candidates: [],
    totalPages: 0,
    currentPage: 0,
  },
};

const candidateReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case uiStuffTypes.SET_CANDIDATE:
      return {
        ...state,
        candidate: payload,
      };
    case uiStuffTypes.CLEAR_CANDIDATE:
      return {
        ...state,
        candidate: emptyCandidate,
        isSuccessful: false,
      };
    case createCandidateTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createCandidateTypes.SUCCESS:
      return {
        ...state,
        candidate: emptyCandidate,
        list: {
          ...state.list,
          totalItems: state.list.totalItems + 1,
          candidates: [payload, ...state.list.candidates],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case createCandidateTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getAllCandidatesTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getAllCandidatesTypes.SUCCESS:
      return {
        ...state,
        list: {
          candidates: payload,
          isLoading: false,
          initialLoading: false,
        },
      };

    case getAllCandidatesTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case getCandidateByIdTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getCandidateByIdTypes.SUCCESS:
      return {
        ...state,
        candidate: payload,
        isLoading: false,
      };

    case getCandidateByIdTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getCandidateProfileTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getCandidateProfileTypes.SUCCESS:
      return {
        ...state,
        account: payload,
        isLoading: false,
      };

    case getCandidateProfileTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case updateCandidateTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateCandidateTypes.SUCCESS:
      const updateCandidateIndex = state.list.candidates.findIndex(
        (candidate) => candidate.candidateId === payload.candidateId,
      );
      return {
        ...state,
        candidate: emptyCandidate,
        list: {
          ...state.list,
          candidates: [
            ...state.list.candidates.slice(0, updateCandidateIndex),
            { ...state.list.candidates[updateCandidateIndex], ...payload },
            ...state.list.candidates.slice(updateCandidateIndex + 1),
          ],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case updateCandidateTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case createCandidateProfileTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createCandidateProfileTypes.SUCCESS:
      return {
        ...state,
        account: payload,
        list: {
          ...state.list,
          totalItems: state.list.totalItems + 1,
          candidates: [payload, ...state.list.candidates],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case createCandidateProfileTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case updateCandidateProfileTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateCandidateProfileTypes.SUCCESS:
      const updateCandidateProfileIndex = state.list.candidates.findIndex(
        (candidate) => candidate.candidateId === payload.candidateId,
      );
      return {
        ...state,
        account: payload,
        list: {
          ...state.list,
          candidates: [
            ...state.list.candidates.slice(0, updateCandidateProfileIndex),
            { ...state.list.candidates[updateCandidateProfileIndex], ...payload },
            ...state.list.candidates.slice(updateCandidateProfileIndex + 1),
          ],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case updateCandidateProfileTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case applyForJobTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case applyForJobTypes.SUCCESS:
      return {
        ...state,
        application: emptyApplication,
        applications: {
          ...state.applications,
          applications: [payload, ...state.applications.applications],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case applyForJobTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case updateApplicationTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateApplicationTypes.SUCCESS:
      const applicationIndex = state.applications.applications.findIndex(
        (application) => application.applicationId === payload.applicationId,
      );

      return {
        ...state,
        application: emptyApplication,
        applications: {
          ...state.applications,
          applications: [
            ...state.applications.applications.slice(0, applicationIndex),
            { ...state.applications.applications[applicationIndex], ...payload },
            ...state.applications.applications.slice(applicationIndex + 1),
          ],
        },
        isLoading: false,
        isSuccessful: true,
      };

    case updateApplicationTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case getCandidateApplicationsTypes.REQUEST:
      return {
        ...state,
        applications: {
          ...initialState.applications,
          isLoading: true,
        },
      };

    case getCandidateApplicationsTypes.SUCCESS:
      return {
        ...state,
        applications: {
          applications: payload,
          isLoading: false,
          initialLoading: false,
        },
      };

    case getCandidateApplicationsTypes.FAILURE:
      return {
        ...state,
        error: payload,
        applications: {
          ...initialState.applications,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};

export default candidateReducer;
