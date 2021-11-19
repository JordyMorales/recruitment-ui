import {
  uiStuffTypes,
  createUserTypes,
  getAllUsersTypes,
  getCurrentUserTypes,
  getUserByIdTypes,
  registerTypes,
  updateUserTypes,
} from './constants';

export const userActions = {
  setUser: (payload: any) => ({
    type: uiStuffTypes.SET_USER,
    payload,
  }),
  clearUser: () => ({
    type: uiStuffTypes.CLEAR_USER,
  }),
  showModal: () => ({
    type: uiStuffTypes.SHOW_MODAL,
  }),
  hiModal: () => ({
    type: uiStuffTypes.HIDE_MODAL,
  }),
  createUserRequest: (payload: any) => ({
    type: createUserTypes.REQUEST,
    payload,
  }),
  createUserSuccess: (payload: any) => ({
    type: createUserTypes.SUCCESS,
    payload,
  }),
  createUserFailure: (error: string) => ({
    type: createUserTypes.FAILURE,
    payload: error,
  }),
  getAllUsersRequest: () => ({
    type: getAllUsersTypes.REQUEST,
  }),
  getAllUsersSuccess: (payload: any) => ({
    type: getAllUsersTypes.SUCCESS,
    payload,
  }),
  getAllUsersFailure: (error: string) => ({
    type: getAllUsersTypes.FAILURE,
    payload: error,
  }),
  getCurrentUserRequest: () => ({
    type: getCurrentUserTypes.REQUEST,
  }),
  getCurrentUserSuccess: (payload: any) => ({
    type: getCurrentUserTypes.SUCCESS,
    payload,
  }),
  getCurrentUserFailure: (error: string) => ({
    type: getCurrentUserTypes.FAILURE,
    payload: error,
  }),
  getUserByIdRequest: (payload: any) => ({
    type: getUserByIdTypes.REQUEST,
    payload,
  }),
  getUserByIdSuccess: (payload: any) => ({
    type: getUserByIdTypes.SUCCESS,
    payload,
  }),
  getUserByIdFailure: (error: string) => ({
    type: getUserByIdTypes.FAILURE,
    payload: error,
  }),
  registerRequest: (payload: any) => ({
    type: registerTypes.REQUEST,
    payload,
  }),
  registerSuccess: (payload: any) => ({
    type: registerTypes.SUCCESS,
    payload,
  }),
  registerFailure: (error: string) => ({
    type: registerTypes.FAILURE,
    payload: error,
  }),
  updateUserRequest: (payload: any) => ({
    type: updateUserTypes.REQUEST,
    payload,
  }),
  updateUserSuccess: (payload: any) => ({
    type: updateUserTypes.SUCCESS,
    payload,
  }),
  updateUserFailure: (error: string) => ({
    type: updateUserTypes.FAILURE,
    payload: error,
  }),
};
