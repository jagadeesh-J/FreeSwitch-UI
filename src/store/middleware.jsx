import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

export const sagaMiddleware = createSagaMiddleware();

// ======================================================
// Middleware Configuration
// ======================================================
const middleware = [thunk, sagaMiddleware];

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require('redux-logger');
	const invariant = require('redux-immutable-state-invariant').default;

	middleware.push(invariant());
	middleware.push(createLogger({ collapsed: true }));
}

export default middleware;
