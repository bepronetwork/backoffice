import { combineReducers } from '@reduxjs/toolkit';

import admin from './ducks/admin';

const rootReducer = combineReducers({
  admin
});

export default rootReducer;
