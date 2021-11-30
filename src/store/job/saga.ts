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
  applyForJobTypes,
  updateApplicationTypes,
  getJobApplicationsTypes,
} from './constants';

function* createJob({ payload }: AnyAction): any {
  try {
    const res = yield call([services.job, 'createJob'], payload);
    yield put(jobActions.createJobSuccess(res));
    toast.success('The job was saved successfully');
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
    toast.success('Job edited successfully!');
  } catch (error: any) {
    console.error('function*updateJob -> error', error);
    toast.error(error);
    yield put(jobActions.updateJobFailure(error));
  }
}

function* applyForJob({ payload }: AnyAction): any {
  try {
    const applicationCreated = yield call([services.job, 'applyForJob'], payload);
    yield put(jobActions.applyForJobSuccess(applicationCreated));
    toast.success('Great, your application registered successfully!');    
  } catch (error: any) {
    console.error('function*applyForJob -> error', error);
    toast.error(error);
    yield put(jobActions.applyForJobFailure(error));
  }
}

function* updateApplication({ payload }: AnyAction): any {
  try {
    yield call([services.job, 'updateApplication'], payload);
    yield put(jobActions.updateApplicationSuccess(payload));
  } catch (error: any) {
    console.error('function*updateApplication -> error', error);
    toast.error(error);
    yield put(jobActions.updateApplicationFailure(error));
  }
}

function* getJobApplications({ payload }: any): any {
  try {
    const res = yield call([services.job, 'getJobApplications'], payload);
    yield put(jobActions.getJobApplicationsSuccess(res));
  } catch (error: any) {
    console.error('function*getJobApplications -> error', error);
    yield put(jobActions.getJobApplicationsFailure(error));
  }
}

function* JobSaga() {
  yield takeLatest(createJobTypes.REQUEST, createJob);
  yield takeLatest(getAllJobsTypes.REQUEST, getAllJobs);
  yield takeLatest(getJobByIdTypes.REQUEST, getJobById);
  yield takeLatest(updateJobTypes.REQUEST, updateJob);
  yield takeLatest(applyForJobTypes.REQUEST, applyForJob);
  yield takeLatest(updateApplicationTypes.REQUEST, updateApplication);
  yield takeLatest(getJobApplicationsTypes.REQUEST, getJobApplications);
}

export default JobSaga;
