import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import { reducers } from './combinedReducers';

export const history = createHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers,
    composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(middleware)
    ));
