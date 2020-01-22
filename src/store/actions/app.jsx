/**
 * @module Actions/Application
 * @desc Application Actions
 */
import { ActionTypes } from '../../constants/index';
export const loadUsers = () => dispatch => {
    dispatch({ type: ActionTypes.LOAD_APP_CONFIG_LOADING });
};