import {
  uiStuffTypes,
  createTagTypes,
  getAllTagsTypes,
  getActiveTagsTypes,
  updateTagTypes,
} from './constants';

import { TagState, emptyTag } from './types';
const initialState: TagState = {
  isOpen: false,
  shouldClose: false,
  error: '',
  isLoading: false,
  tag: emptyTag,
  list: {
    isLoading: false,
    totalItems: 0,
    tags: [],
    totalPages: 0,
    currentPage: 0,
  },
};

const tagReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case uiStuffTypes.SET_TAG:
      return {
        ...state,
        tag: payload,
      };
    case uiStuffTypes.CLEAR_TAG:
      return {
        ...state,
        tag: emptyTag,
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
        tag: emptyTag,
      };

    case createTagTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case createTagTypes.SUCCESS:
      return {
        ...state,
        tag: emptyTag,
        list: {
          ...state.list,
          totalItems: state.list.totalItems + 1,
          tags: [payload, ...state.list.tags],
        },
        isLoading: false,
        shouldClose: true,
      };

    case createTagTypes.FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };

    case getAllTagsTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getAllTagsTypes.SUCCESS:
      return {
        ...state,
        list: {
          tags: payload,
          isLoading: false,
        },
      };

    case getAllTagsTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case getActiveTagsTypes.REQUEST:
      return {
        ...state,
        list: {
          ...initialState.list,
          isLoading: true,
        },
      };

    case getActiveTagsTypes.SUCCESS:
      return {
        ...state,
        list: {
          tags: payload,
          isLoading: false,
        },
      };

    case getActiveTagsTypes.FAILURE:
      return {
        ...state,
        error: payload,
        list: {
          ...initialState.list,
          isLoading: false,
        },
      };

    case updateTagTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case updateTagTypes.SUCCESS:
      const index = state.list.tags.findIndex((tag) => tag.tagId === payload.tagId);
      return {
        ...state,
        tag: emptyTag,
        list: {
          ...state.list,
          tags: [
            ...state.list.tags.slice(0, index),
            { ...state[index], ...payload },
            ...state.list.tags.slice(index + 1),
          ],
        },
        isLoading: false,
        shouldClose: true,
      };

    case updateTagTypes.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default tagReducer;
