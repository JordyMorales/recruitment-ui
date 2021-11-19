import {
  uiStuffTypes,
  createUserTypes,
  getAllUsersTypes,
  getCurrentUserTypes,
  getUserByIdTypes,
  registerTypes,
  updateUserTypes,
} from './constants';

import { UserState, emptyUser } from './types';
const initialState: UserState = {
  isOpen: false,
  shouldClose: false,
  profile: emptyUser,
  error: '',
  isLoading: false,
  user: emptyUser,
  list: {
    isLoading: false,
    totalItems: 0,
    users: [],
    totalPages: 0,
    currentPage: 0,
  },
};

const userReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case uiStuffTypes.SET_USER:
      return {
        ...state,
        user: payload,
      };
    case uiStuffTypes.CLEAR_USER:
      return {
        ...state,
        user: emptyUser,
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
      };

    case createUserTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createUserTypes.SUCCESS:
      return {
        ...state,
        user: emptyUser,
        list: {
          ...state.list,
          users: [payload, ...state.list.users],
          totalItems: state.list.totalItems + 1,
        },
        isLoading: false,
        shouldClose: true,
      };

    case createUserTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getAllUsersTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getAllUsersTypes.SUCCESS:
      return {
        ...state,
        list: {
          users: payload,
          isLoading: false,
        },
      };

    case getAllUsersTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case getCurrentUserTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getCurrentUserTypes.SUCCESS:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };

    case getCurrentUserTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getUserByIdTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case getUserByIdTypes.SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };

    case getUserByIdTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case registerTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case registerTypes.SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          users: state.list.users.unshift(payload),
          totalItems: state.list.totalItems + 1,
        },
        isLoading: false,
      };

    case registerTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case updateUserTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateUserTypes.SUCCESS:
      const index = state.list.users.findIndex((user) => user.userId === payload.userId);
      return {
        ...state,
        user: emptyUser,
        list: {
          ...state.list,
          users: [
            ...state.list.users.slice(0, index),
            { ...state[index], ...payload },
            ...state.list.users.slice(index + 1),
          ],
        },
        isLoading: false,
        shouldClose: true,
      };

    case updateUserTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default userReducer;