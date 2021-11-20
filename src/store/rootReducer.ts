import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import technologyReducer from './technology/reducer';
import tagReducer from './tag/reducer';
import candidateReducer from './candidate/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  technology: technologyReducer,
  tag: tagReducer,
  candidate: candidateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
