import { all } from 'redux-saga/effects';
import user from './user/saga';
import technology from './technology/saga';
import tag from './tag/saga';
import candidate from './candidate/saga';
import process from './process/saga';
import job from './job/saga';
import application from './application/saga';

export default function* rootSaga() {
  yield all([user(), technology(), tag(), candidate(), process(), job(), application()]);
}
