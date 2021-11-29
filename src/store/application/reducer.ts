import { uiStuffTypes, getApplicationByIdTypes } from './constants';

import { ApplicationState, emptyApplication } from './types';

const initialState: ApplicationState = {
  isOpen: false,
  shouldClose: false,
  isLoading: false,
  isSuccessful: false,
  error: '',
  application: emptyApplication,
};

const applicationReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case uiStuffTypes.SET_APPLICATION:
      return {
        ...state,
        application: payload,
      };

    case uiStuffTypes.CLEAR_APPLICATION:
      return {
        ...state,
        application: emptyApplication,
        isSuccessful: false,
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
        application: emptyApplication,
      };

    case getApplicationByIdTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getApplicationByIdTypes.SUCCESS:
      return {
        ...state,
        application: payload,
        isLoading: false,
      };

    case getApplicationByIdTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default applicationReducer;
