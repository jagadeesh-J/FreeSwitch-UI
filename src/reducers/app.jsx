import { ActionTypes } from '../constants/index';

const initialState = {
    app: {},
    loading: false,
    error: ''
};

export default function appReducer(state = initialState, action) {

    switch (action.type) {
        case ActionTypes.LOAD_APP_CONFIG_LOADING:
            {
                return {
                    ...state,
                    loading: true,
                    error: ''
                };
            }
        case ActionTypes.LOAD_APP_CONFIG_SUCCESS:
            {
                return {
                    ...state,
                    app: action.app,
                    loading: false
                }
            }
        case ActionTypes.LOAD_APP_CONFIG_ERROR:
            {
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
            }
        default:
            {
                return state;
            }
    }
}