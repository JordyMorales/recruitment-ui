import { all } from 'redux-saga/effects';
import user from './user/saga';
import technology from './technology/saga';
import tag from './tag/saga';

export default function* rootSaga() {
  yield all([user(), technology(), tag()]);
}
