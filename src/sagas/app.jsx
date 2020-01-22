/**
 * @module Sagas/App
 * @desc App
 */
import { put, takeEvery } from 'redux-saga/effects'
import Api from '../modules/api'
import { ActionTypes } from '../constants/index';

/**
 * Application
 *
 * @param {Object} action
 *
 */

async function fetchAsync(func) {
    const response = await func();
    return response;
}

function* fetchAppConfig() {
    try {
        const appConfig = yield fetchAsync(Api.getAppConfig);
        yield put({ type: ActionTypes.LOAD_APP_CONFIG_SUCCESS, app: appConfig });
    } catch (e) {
        yield put({ type: ActionTypes.LOAD_APP_CONFIG_ERROR, error: e.message });
    }
}

export function* appSaga() {
    yield takeEvery(ActionTypes.LOAD_APP_CONFIG_LOADING, fetchAppConfig);
}

export default appSaga;