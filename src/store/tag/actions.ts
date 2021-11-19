import {
  uiStuffTypes,
  createTagTypes,
  getAllTagsTypes,
  getTagByIdTypes,
  updateTagTypes,
} from './constants';

export const tagActions = {
  setTag: (payload: any) => ({
    type: uiStuffTypes.SET_TAG,
    payload,
  }),
  clearTag: () => ({
    type: uiStuffTypes.CLEAR_TAG,
  }),
  showModal: () => ({
    type: uiStuffTypes.SHOW_MODAL,
  }),
  hiModal: () => ({
    type: uiStuffTypes.HIDE_MODAL,
  }),
  createTagRequest: (payload: any) => ({
    type: createTagTypes.REQUEST,
    payload,
  }),
  createTagSuccess: (payload: any) => ({
    type: createTagTypes.SUCCESS,
    payload,
  }),
  createTagFailure: (error: string) => ({
    type: createTagTypes.FAILURE,
    payload: error,
  }),
  getAllTagsRequest: () => ({
    type: getAllTagsTypes.REQUEST,
  }),
  getAllTagsSuccess: (payload: any) => ({
    type: getAllTagsTypes.SUCCESS,
    payload,
  }),
  getAllTagsFailure: (error: string) => ({
    type: getAllTagsTypes.FAILURE,
    payload: error,
  }),
  getTagByIdRequest: (payload: any) => ({
    type: getTagByIdTypes.REQUEST,
    payload,
  }),
  getTagByIdSuccess: (payload: any) => ({
    type: getTagByIdTypes.SUCCESS,
    payload,
  }),
  getTagByIdFailure: (error: string) => ({
    type: getTagByIdTypes.FAILURE,
    payload: error,
  }),
  updateTagRequest: (payload: any) => ({
    type: updateTagTypes.REQUEST,
    payload,
  }),
  updateTagSuccess: (payload: any) => ({
    type: updateTagTypes.SUCCESS,
    payload,
  }),
  updateTagFailure: (error: string) => ({
    type: updateTagTypes.FAILURE,
    payload: error,
  }),
};
