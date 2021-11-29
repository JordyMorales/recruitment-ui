import { call, put, takeLatest } from 'redux-saga/effects';
import { applicationActions } from './actions';
import services from '../../services';
import { getApplicationByIdTypes } from './constants';


function* getApplicationById({ payload }: any): any {
  try {
    const res = yield call([services.application, 'getApplicationById'], payload);
    yield put(applicationActions.getApplicationByIdSuccess(res));
  } catch (error: any) {
    console.error('function*getApplicationById -> error', error);
    yield put(applicationActions.getApplicationByIdFailure(error));
  }
}

function* ApplicationSaga() {
  yield takeLatest(getApplicationByIdTypes.REQUEST, getApplicationById);
}

export default ApplicationSaga;
