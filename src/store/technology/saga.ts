import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { technologyActions } from './actions';
import services from '../../services';
import {
  createTechnologyTypes,
  getAllTechnologiesTypes,
  getActiveTechnologiesTypes,
  updateTechnologyTypes,
} from './constants';

function* createTechnology({ payload }: AnyAction): any {
  try {
    const res = yield call([services.technology, 'createTechnology'], payload);
    yield put(technologyActions.createTechnologySuccess(res));
    toast.success('You have created a new Technology!');
  } catch (error: any) {
    console.error('function*createTechnology -> error', error);
    toast.error(error);
    yield put(technologyActions.createTechnologyFailure(error));
  }
}

function* getAllTechnologies(): any {
  try {
    const res = yield call([services.technology, 'getAllTechnologies']);
    yield put(technologyActions.getAllTechnologiesSuccess(res));
  } catch (error: any) {
    console.error('function*getAllTechnologies -> error', error);
    yield put(technologyActions.getAllTechnologiesFailure(error));
  }
}

function* getActiveTechnologies(): any {
  try {
    const res = yield call([services.technology, 'getActiveTechnologies']);
    yield put(technologyActions.getActiveTechnologiesSuccess(res));
  } catch (error: any) {
    console.error('function*getActiveTechnologies -> error', error);
    yield put(technologyActions.getActiveTechnologiesFailure(error));
  }
}

function* updateTechnology({ payload }: AnyAction): any {
  try {
    yield call([services.technology, 'updateTechnology'], payload);
    yield put(technologyActions.updateTechnologySuccess(payload));
    toast.success('You have updated a Technology!');
  } catch (error: any) {
    console.error('function*updateTechnology -> error', error);
    toast.error(error);
    yield put(technologyActions.updateTechnologyFailure(error));
  }
}

function* TechnologySaga() {
  yield takeLatest(createTechnologyTypes.REQUEST, createTechnology);
  yield takeLatest(getAllTechnologiesTypes.REQUEST, getAllTechnologies);
  yield takeLatest(getActiveTechnologiesTypes.REQUEST, getActiveTechnologies);
  yield takeLatest(updateTechnologyTypes.REQUEST, updateTechnology);
}

export default TechnologySaga;
