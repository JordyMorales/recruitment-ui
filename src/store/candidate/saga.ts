import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { candidateActions } from './actions';
import { userActions } from '../user/actions';
import services from '../../services';
import {
  createCandidateTypes,
  getAllCandidatesTypes,
  getCandidateByIdTypes,
  getCandidateProfileTypes,
  updateCandidateTypes,
  updateCandidateProfileTypes,
  applyForJobTypes,
  updateApplicationTypes,
  getCandidateApplicationsTypes,
} from './constants';

function* createCandidate({ payload }: AnyAction): any {
  try {
    if (payload.user && payload.candidate) {
      const userCreated = yield call([services.user, 'createUser'], payload.user);
      yield put(userActions.createUserSuccess(userCreated));

      const candidateCreated = yield call([services.candidate, 'createCandidate'], payload.candidate);
      yield put(candidateActions.createCandidateSuccess({ ...candidateCreated }));
    } else {
      const candidateCreated = yield call([services.candidate, 'createCandidate'], payload);
      yield put(candidateActions.createCandidateSuccess(candidateCreated));
    }
  } catch (error: any) {
    console.error('function*createCandidate -> error', error);
    toast.error(error);
    yield put(candidateActions.createCandidateFailure(error));
  }
}

function* getAllCandidates(): any {
  try {
    const res = yield call([services.candidate, 'getAllCandidates']);
    yield put(candidateActions.getAllCandidatesSuccess(res));
  } catch (error: any) {
    console.error('function*getAllCandidates -> error', error);
    yield put(candidateActions.getAllCandidatesFailure(error));
  }
}

function* getCandidateById({ payload }: any): any {
  try {
    const res = yield call([services.candidate, 'getCandidateById'], payload);
    yield put(candidateActions.getCandidateByIdSuccess(res));
  } catch (error: any) {
    console.error('function*getCandidateById -> error', error);
    yield put(candidateActions.getCandidateByIdFailure(error));
  }
}

function* getCandidateProfile({ payload }: any): any {
  try {
    const res = yield call([services.candidate, 'getCandidateById'], payload);
    yield put(candidateActions.getCandidateProfileSuccess(res));
  } catch (error) {
    console.error('function*getCandidateProfile -> error', error);
    yield put(candidateActions.getCandidateProfileFailure(error));
  }
}

function* updateCandidate({ payload }: AnyAction): any {
  try {
    if (payload.user && payload.candidate) {
      yield call([services.user, 'updateUser'], payload.user);
      yield put(userActions.updateUserSuccess(payload.user));

      const candidateUpdated = yield call([services.candidate, 'updateCandidate'], payload.candidate);
      yield put(candidateActions.updateCandidateSuccess({ ...candidateUpdated }));
    } else {
      yield call([services.candidate, 'updateCandidate'], payload);
      yield put(candidateActions.updateCandidateSuccess(payload));
    }
  } catch (error: any) {
    console.error('function*updateCandidate -> error', error);
    toast.error(error);
    yield put(candidateActions.updateCandidateFailure(error));
  }
}

function* updateCandidateProfile({ payload }: AnyAction): any {
  try {
    yield call([services.candidate, 'updateCandidate'], payload);
    yield put(candidateActions.updateCandidateProfileSuccess(payload));
  } catch (error: any) {
    console.error('function*updateCandidateProfile -> error', error);
    toast.error(error);
    yield put(candidateActions.updateCandidateProfileFailure(error));
  }
}

function* applyForJob({ payload }: AnyAction): any {
  try {
    const applicationCreated = yield call([services.job, 'applyForJob'], payload);
    yield put(candidateActions.applyForJobSuccess(applicationCreated));
    toast.success('Great, your application registered successfully!');
  } catch (error: any) {
    console.error('function*applyForJob -> error', error);
    toast.error(error);
    yield put(candidateActions.applyForJobFailure(error));
  }
}

function* updateApplication({ payload }: AnyAction): any {
  try {
    yield call([services.job, 'updateApplication'], payload);
    yield put(candidateActions.updateApplicationSuccess(payload));
    toast.success('Great, your application updated successfully!');
  } catch (error: any) {
    console.error('function*updateApplication -> error', error);
    toast.error(error);
    yield put(candidateActions.updateApplicationFailure(error));
  }
}

function* getCandidateApplications({ payload }: any): any {
  try {
    const res = yield call([services.candidate, 'getCandidateApplications'], payload);
    yield put(candidateActions.getCandidateApplicationsSuccess(res));
  } catch (error: any) {
    console.error('function*getCandidateApplications -> error', error);
    yield put(candidateActions.getCandidateApplicationsFailure(error));
  }
}

function* CandidateSaga() {
  yield takeLatest(createCandidateTypes.REQUEST, createCandidate);
  yield takeLatest(getAllCandidatesTypes.REQUEST, getAllCandidates);
  yield takeLatest(getCandidateByIdTypes.REQUEST, getCandidateById);
  yield takeLatest(getCandidateProfileTypes.REQUEST, getCandidateProfile);
  yield takeLatest(updateCandidateTypes.REQUEST, updateCandidate);
  yield takeLatest(updateCandidateProfileTypes.REQUEST, updateCandidateProfile);
  yield takeLatest(applyForJobTypes.REQUEST, applyForJob);
  yield takeLatest(updateApplicationTypes.REQUEST, updateApplication);
  yield takeLatest(getCandidateApplicationsTypes.REQUEST, getCandidateApplications);
}

export default CandidateSaga;
