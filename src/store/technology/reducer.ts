import {
  uiStuffTypes,
  createTechnologyTypes,
  getAllTechnologiesTypes,
  getActiveTechnologiesTypes,
  updateTechnologyTypes,
} from './constants';

import { TechnologyState, emptyTechnology } from './types';
const initialState: TechnologyState = {
  isOpen: false,
  shouldClose: false,
  error: '',
  isLoading: false,
  technology: emptyTechnology,
  list: {
    isLoading: false,
    totalItems: 0,
    technologies: [],
    totalPages: 0,
    currentPage: 0,
  },
};

const technologyReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case uiStuffTypes.SET_TECHNOLOGY:
      return {
        ...state,
        technology: payload,
      };
    case uiStuffTypes.CLEAR_TECHNOLOGY:
      return {
        ...state,
        technology: emptyTechnology,
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
        technology: emptyTechnology,
      };

    case createTechnologyTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createTechnologyTypes.SUCCESS:
      return {
        ...state,
        technology: emptyTechnology,
        list: {
          ...state.list,
          technologies: [payload, ...state.list.technologies],
          totalItems: state.list.totalItems + 1,
        },
        isLoading: false,
        shouldClose: true,
      };

    case createTechnologyTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getAllTechnologiesTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getAllTechnologiesTypes.SUCCESS:
      return {
        ...state,
        list: {
          technologies: payload,
          isLoading: false,
        },
      };

    case getAllTechnologiesTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case getActiveTechnologiesTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getActiveTechnologiesTypes.SUCCESS:
      return {
        ...state,
        list: {
          technologies: payload,
          isLoading: false,
        },
      };

    case getActiveTechnologiesTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case updateTechnologyTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateTechnologyTypes.SUCCESS:
      const index = state.list.technologies.findIndex(
        (technology) => technology.technologyId === payload.technologyId,
      );
      return {
        ...state,
        technology: emptyTechnology,
        list: {
          ...state.list,
          technologies: [
            ...state.list.technologies.slice(0, index),
            { ...state.list.technologies[index], ...payload },
            ...state.list.technologies.slice(index + 1),
          ],
        },
        isLoading: false,
        shouldClose: true,
      };

    case updateTechnologyTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default technologyReducer;
