import { all, fork } from 'redux-saga/effects';

import app from './app';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(app)]);
}
