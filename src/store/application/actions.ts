import {
  uiStuffTypes,
  getApplicationByIdTypes,
} from './constants';

export const applicationActions = {
  setApplication: (payload: any) => ({
    type: uiStuffTypes.SET_APPLICATION,
    payload,
  }),
  clearApplication: () => ({
    type: uiStuffTypes.CLEAR_APPLICATION,
  }),
  showModal: () => ({
    type: uiStuffTypes.SHOW_MODAL,
  }),
  hiModal: () => ({
    type: uiStuffTypes.HIDE_MODAL,
  }),
  getApplicationByIdRequest: (payload: any) => ({
    type: getApplicationByIdTypes.REQUEST,
    payload,
  }),
  getApplicationByIdSuccess: (payload: any) => ({
    type: getApplicationByIdTypes.SUCCESS,
    payload,
  }),
  getApplicationByIdFailure: (error: string) => ({
    type: getApplicationByIdTypes.FAILURE,
    payload: error,
  }),
};
