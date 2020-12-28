import { combineReducers } from '@reduxjs/toolkit';

import admin from './ducks/admin';
import app from './ducks/app';

const rootReducer = combineReducers({
  admin,
  app
});

export default rootReducer;
