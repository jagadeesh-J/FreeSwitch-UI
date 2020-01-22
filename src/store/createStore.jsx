import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootSaga from '../sagas/index';
import rootReducer from '../reducers/index';

import middleware, { sagaMiddleware } from './middleware';

//========================================
// reducer & PersistentReducer
//========================================
const reducer = persistReducer({
        key: '@microchip', // key is required
        storage, // storage is now required (using localStorage)
        whitelist: [], // only this list will not be persisted
        blacklist: [] // list will not be persisted
    },
    combineReducers({...rootReducer }),
);

// ======================================================
// Store Enhancers
// ======================================================
const enhancers = []

let composeEnhancers = compose

const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
}

// ======================================================
// Store Instantiation and HMR Setup
// ======================================================
const configStore = (initialState = {}) => {
    const store = createStore(reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept('./../reducers', () => {
            store.replaceReducer(require('./../reducers/index').default);
        });
    }

    return {
        persistor: persistStore(store),
        store,
    };
};

const { store, persistor } = configStore();

global.store = store;

export { store, persistor };