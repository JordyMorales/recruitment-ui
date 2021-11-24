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
  updateCandidateTypes,
} from './constants';

function* createCandidate({ payload }: AnyAction): any {
  try {
    const userCreated = yield call([services.user, 'createUser'], payload.user);
    yield put(userActions.createUserSuccess(userCreated));

    const candidateCreated = yield call([services.candidate, 'createCandidate'], payload.candidate);
    console.log("🚀 ~ file: saga.ts ~ line 20 ~ function*createCandidate ~ candidateCreated", candidateCreated)
    yield put(candidateActions.createCandidateSuccess({ ...candidateCreated, personalData: userCreated }));

    toast.success('Candidate created successfully!!');
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
    console.error('function*getAllCandidates -> error', error);
    yield put(candidateActions.getCandidateByIdFailure(error));
  }
}

function* updateCandidate({ payload }: AnyAction): any {
  try {
    yield call([services.candidate, 'updateCandidate'], payload);
    yield put(candidateActions.updateCandidateSuccess(payload));
    toast.success('You have updated a Candidate!');
  } catch (error: any) {
    console.error('function*updateCandidate -> error', error);
    toast.error(error);
    yield put(candidateActions.updateCandidateFailure(error));
  }
}

function* CandidateSaga() {
  yield takeLatest(createCandidateTypes.REQUEST, createCandidate);
  yield takeLatest(getAllCandidatesTypes.REQUEST, getAllCandidates);
  yield takeLatest(getCandidateByIdTypes.REQUEST, getCandidateById);
  yield takeLatest(updateCandidateTypes.REQUEST, updateCandidate);
}

export default CandidateSaga;
