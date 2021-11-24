import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { tagActions } from './actions';
import services from '../../services';
import {
  createTagTypes,
  getAllTagsTypes,
  getActiveTagsTypes,
  updateTagTypes,
} from './constants';

function* createTag({ payload }: AnyAction): any {
  try {
    const res = yield call([services.tag, 'createTag'], payload);
    yield put(tagActions.createTagSuccess(res));
    toast.success('You have created a new Tag!');
  } catch (error: any) {
    console.error('function*createTag -> error', error);
    toast.error(error);
    yield put(tagActions.createTagFailure(error));
  }
}

function* getAllTags(): any {
  try {
    const res = yield call([services.tag, 'getAllTags']);
    yield put(tagActions.getAllTagsSuccess(res));
  } catch (error: any) {
    console.error('function*getAllTags -> error', error);
    yield put(tagActions.getAllTagsFailure(error));
  }
}

function* getActiveTags(): any {
  try {
    const res = yield call([services.tag, 'getActiveTags']);
    yield put(tagActions.getActiveTagsSuccess(res));
  } catch (error: any) {
    console.error('function*getActiveTags -> error', error);
    yield put(tagActions.getActiveTagsFailure(error));
  }
}

function* updateTag({ payload }: AnyAction): any {
  try {
    yield call([services.tag, 'updateTag'], payload);
    yield put(tagActions.updateTagSuccess(payload));
    toast.success('You have updated a Tag!');
  } catch (error: any) {
    console.error('function*updateTag -> error', error);
    toast.error(error);
    yield put(tagActions.updateTagFailure(error));
  }
}

function* TagSaga() {
  yield takeLatest(createTagTypes.REQUEST, createTag);
  yield takeLatest(getAllTagsTypes.REQUEST, getAllTags);
  yield takeLatest(getActiveTagsTypes.REQUEST, getActiveTags);
  yield takeLatest(updateTagTypes.REQUEST, updateTag);
}

export default TagSaga;
