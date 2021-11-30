import {
  getBoardTypes,
  moveCardTypes
} from './constants';

export const boardActions = {
  getBoardRequest: (payload: any) => ({
    type: getBoardTypes.REQUEST,
    payload,
  }),
  getBoardSuccess: (payload: any) => ({
    type: getBoardTypes.SUCCESS,
    payload,
  }),
  getBoardFailure: (error: string) => ({
    type: getBoardTypes.FAILURE,
    payload: error,
  }),
  moveCardRequest: (payload: any) => ({
    type: moveCardTypes.REQUEST,
    payload,
  }),
  moveCardSuccess: (payload: any) => ({
    type: moveCardTypes.SUCCESS,
    payload,
  }),
  moveCardFailure: (error: string) => ({
    type: moveCardTypes.FAILURE,
    payload: error,
  }),

}