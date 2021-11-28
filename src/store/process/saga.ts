import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { processActions } from './actions';
import services from '../../services';
import {
  createProcessTypes,
  getAllProcessesTypes,
  getProcessByIdTypes,
  updateProcessTypes,
} from './constants';

function* createProcess({ payload }: AnyAction): any {
  try {
    const res = yield call([services.process, 'createProcess'], payload);
    yield put(processActions.createProcessSuccess(res));
    toast.success('You have created a new Process!');
  } catch (error: any) {
    console.error('function*createProcess -> error', error);
    toast.error(error);
    yield put(processActions.createProcessFailure(error));
  }
}

function* getAllProcesses(): any {
  try {
    const res = yield call([services.process, 'getAllProcesses']);
    yield put(processActions.getAllProcessesSuccess(res));
  } catch (error: any) {
    console.error('function*getAllProcesses -> error', error);
    yield put(processActions.getAllProcessesFailure(error));
  }
}

function* getProcessById({ payload }: any): any {
  try {
    const res = yield call([services.process, 'getProcessById'], payload);
    yield put(processActions.getProcessByIdSuccess(res));
  } catch (error: any) {
    console.error('function*getProcessById -> error', error);
    yield put(processActions.getProcessByIdFailure(error));
  }
}

function* updateProcess({ payload }: AnyAction): any {
  try {
    yield call([services.process, 'updateProcess'], payload);
    yield put(processActions.updateProcessSuccess(payload));
    toast.success('You have updated a Process!');
  } catch (error: any) {
    console.error('function*updateProcess -> error', error);
    toast.error(error);
    yield put(processActions.updateProcessFailure(error));
  }
}

function* ProcessSaga() {
  yield takeLatest(createProcessTypes.REQUEST, createProcess);
  yield takeLatest(getAllProcessesTypes.REQUEST, getAllProcesses);
  yield takeLatest(getProcessByIdTypes.REQUEST, getProcessById);
  yield takeLatest(updateProcessTypes.REQUEST, updateProcess);
}

export default ProcessSaga;
