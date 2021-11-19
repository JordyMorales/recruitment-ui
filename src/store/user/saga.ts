import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { userActions } from './actions';
import services from '../../services';
import {
  createUserTypes,
  getAllUsersTypes,
  getCurrentUserTypes,
  getUserByIdTypes,
  registerTypes,
  updateUserTypes,
} from './constants';

function* createUser({ payload }: AnyAction): any {
  try {
    const res = yield call([services.user, 'createUser'], payload);
    yield put(userActions.createUserSuccess(res));
    toast.success('You have created a new User!');
  } catch (error: any) {
    console.error('function*createUser -> error', error);
    toast.error(error);
    yield put(userActions.createUserFailure(error));
  }
}

function* getAllUsers(): any {
  try {
    const res = yield call([services.user, 'getAllUsers']);
    yield put(userActions.getAllUsersSuccess(res));
  } catch (error: any) {
    console.error('function*getAllUsers -> error', error);
    yield put(userActions.getAllUsersFailure(error));
  }
}

function* getCurrentUser(): any {
  try {
    const res = yield call([services.user, 'getCurrentUser']);
    yield put(userActions.getCurrentUserSuccess(res));
  } catch (error: any) {
    console.error('function*getAllUsers -> error', error);
    yield put(userActions.getCurrentUserFailure(error));
  }
}

function* getUserById({ payload }: any): any {
  try {
    const res = yield call([services.user, 'getUserById'], payload);
    yield put(userActions.getUserByIdSuccess(res));
  } catch (error: any) {
    console.error('function*getAllUsers -> error', error);
    yield put(userActions.getUserByIdFailure(error));
  }
}

function* register({ payload }: AnyAction): any {
  try {
    const res = yield call([services.user, 'register'], payload);
    yield put(userActions.createUserSuccess(res));
    toast.success('You have created a new User!');
  } catch (error: any) {
    console.error('function*createUser -> error', error);
    toast.error(error);
    yield put(userActions.createUserFailure(error));
  }
}

function* updateUser({ payload }: AnyAction): any {
  try {
    yield call([services.user, 'updateUser'], payload);
    yield put(userActions.updateUserSuccess(payload));
    toast.success('You have updated a User!');
  } catch (error: any) {
    console.error('function*updateUser -> error', error);
    toast.error(error);
    yield put(userActions.updateUserFailure(error));
  }
}

function* UserSaga() {
  yield takeLatest(createUserTypes.REQUEST, createUser);
  yield takeLatest(getAllUsersTypes.REQUEST, getAllUsers);
  yield takeLatest(getCurrentUserTypes.REQUEST, getCurrentUser);
  yield takeLatest(getUserByIdTypes.REQUEST, getUserById);
  yield takeLatest(registerTypes.REQUEST, register);
  yield takeLatest(updateUserTypes.REQUEST, updateUser);
}

export default UserSaga;
