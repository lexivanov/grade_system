import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { userReducer } from './user/reducer';

export const reducers = combineReducers({
    routing: routerReducer,
    userReducer
});
