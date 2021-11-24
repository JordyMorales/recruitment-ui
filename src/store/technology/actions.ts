import {
  uiStuffTypes,
  createTechnologyTypes,
  getAllTechnologiesTypes,
  getActiveTechnologiesTypes,
  updateTechnologyTypes,
} from './constants';

export const technologyActions = {
  setTechnology: (payload: any) => ({
    type: uiStuffTypes.SET_TECHNOLOGY,
    payload,
  }),
  clearTechnology: () => ({
    type: uiStuffTypes.CLEAR_TECHNOLOGY,
  }),
  showModal: () => ({
    type: uiStuffTypes.SHOW_MODAL,
  }),
  hiModal: () => ({
    type: uiStuffTypes.HIDE_MODAL,
  }),
  createTechnologyRequest: (payload: any) => ({
    type: createTechnologyTypes.REQUEST,
    payload,
  }),
  createTechnologySuccess: (payload: any) => ({
    type: createTechnologyTypes.SUCCESS,
    payload,
  }),
  createTechnologyFailure: (error: string) => ({
    type: createTechnologyTypes.FAILURE,
    payload: error,
  }),
  getAllTechnologiesRequest: () => ({
    type: getAllTechnologiesTypes.REQUEST,
  }),
  getAllTechnologiesSuccess: (payload: any) => ({
    type: getAllTechnologiesTypes.SUCCESS,
    payload,
  }),
  getAllTechnologiesFailure: (error: string) => ({
    type: getAllTechnologiesTypes.FAILURE,
    payload: error,
  }),
  getActiveTechnologiesRequest: () => ({
    type: getActiveTechnologiesTypes.REQUEST,
  }),
  getActiveTechnologiesSuccess: (payload: any) => ({
    type: getActiveTechnologiesTypes.SUCCESS,
    payload,
  }),
  getActiveTechnologiesFailure: (error: string) => ({
    type: getActiveTechnologiesTypes.FAILURE,
    payload: error,
  }),
  updateTechnologyRequest: (payload: any) => ({
    type: updateTechnologyTypes.REQUEST,
    payload,
  }),
  updateTechnologySuccess: (payload: any) => ({
    type: updateTechnologyTypes.SUCCESS,
    payload,
  }),
  updateTechnologyFailure: (error: string) => ({
    type: updateTechnologyTypes.FAILURE,
    payload: error,
  }),
};
