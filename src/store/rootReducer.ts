import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import technologyReducer from './technology/reducer';
import tagReducer from './tag/reducer';
import candidateReducer from './candidate/reducer';
import processReducer from './process/reducer';
import jobReducer from './job/reducer';
import applicationReducer from './application/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  technology: technologyReducer,
  tag: tagReducer,
  candidate: candidateReducer,
  process: processReducer,
  job: jobReducer,
  application: applicationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
