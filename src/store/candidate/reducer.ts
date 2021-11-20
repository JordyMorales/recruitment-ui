import {
  uiStuffTypes,
  createCandidateTypes,
  getAllCandidatesTypes,
  getCandidateByIdTypes,
  updateCandidateTypes,
} from './constants';

import { CandidateState, emptyCandidate } from './types';
const initialState: CandidateState = {
  isOpen: false,
  shouldClose: false,
  error: '',
  isLoading: false,
  candidate: emptyCandidate,
  list: {
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
        candidate: emptyCandidate,
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
        shouldClose: true,
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

    case updateCandidateTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateCandidateTypes.SUCCESS:
      const index = state.list.candidates.findIndex((candidate) => candidate.candidateId === payload.candidateId);
      return {
        ...state,
        candidate: emptyCandidate,
        list: {
          ...state.list,
          candidates: [
            ...state.list.candidates.slice(0, index),
            { ...state[index], ...payload },
            ...state.list.candidates.slice(index + 1),
          ],
        },
        isLoading: false,
        shouldClose: true,
      };

    case updateCandidateTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default candidateReducer;
