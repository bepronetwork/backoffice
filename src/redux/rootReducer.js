import { combineReducers } from '@reduxjs/toolkit';

import auth from './ducks/auth';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
