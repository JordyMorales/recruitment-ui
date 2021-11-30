import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import services from '../../services';
import { boardActions } from './actions';
import { getBoardTypes } from './constants';

function* getBoard({ payload }: AnyAction): any {
  try {
    const job = yield call([services.job, 'getJobById'], payload);

    const process = yield call([services.process, 'getProcessById'], { processId: job.processId });

    const columns = [];
    for (const step of process.steps) {
      const applications = yield call([services.step, 'getStepApplications'], { stepId: step.stepId, jobId: job.jobId });
      columns.push({ ...step, applications });
    }

    yield put(boardActions.getBoardSuccess(columns));
  } catch (error: any) {
    console.error('function*getAllJobs -> error', error);
    yield put(boardActions.getBoardFailure(error));
  }
}

function* BoardSaga() {
  yield takeLatest(getBoardTypes.REQUEST, getBoard);
}

export default BoardSaga;
