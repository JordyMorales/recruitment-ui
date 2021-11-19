import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import technologyReducer from './technology/reducer';
import tagReducer from './tag/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  technology: technologyReducer,
  tag: tagReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
