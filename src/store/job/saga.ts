import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { jobActions } from './actions';
import services from '../../services';
import {
  createJobTypes,
  getAllJobsTypes,
  getJobByIdTypes,
  updateJobTypes,
} from './constants';

function* createJob({ payload }: AnyAction): any {
  try {
    const res = yield call([services.job, 'createJob'], payload);
    yield put(jobActions.createJobSuccess(res));
    toast.success('You have created a new Job!');
  } catch (error: any) {
    console.error('function*createJob -> error', error);
    toast.error(error);
    yield put(jobActions.createJobFailure(error));
  }
}

function* getAllJobs(): any {
  try {
    const res = yield call([services.job, 'getAllJobs']);
    yield put(jobActions.getAllJobsSuccess(res));
  } catch (error: any) {
    console.error('function*getAllJobs -> error', error);
    yield put(jobActions.getAllJobsFailure(error));
  }
}

function* getJobById({ payload }: any): any {
  try {
    const res = yield call([services.job, 'getJobById'], payload);
    yield put(jobActions.getJobByIdSuccess(res));
  } catch (error: any) {
    console.error('function*getJobById -> error', error);
    yield put(jobActions.getJobByIdFailure(error));
  }
}

function* updateJob({ payload }: AnyAction): any {
  try {
    yield call([services.job, 'updateJob'], payload);
    yield put(jobActions.updateJobSuccess(payload));
    toast.success('You have updated a Job!');
  } catch (error: any) {
    console.error('function*updateJob -> error', error);
    toast.error(error);
    yield put(jobActions.updateJobFailure(error));
  }
}

function* JobSaga() {
  yield takeLatest(createJobTypes.REQUEST, createJob);
  yield takeLatest(getAllJobsTypes.REQUEST, getAllJobs);
  yield takeLatest(getJobByIdTypes.REQUEST, getJobById);
  yield takeLatest(updateJobTypes.REQUEST, updateJob);
}

export default JobSaga;
