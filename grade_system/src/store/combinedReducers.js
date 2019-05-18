import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { userReducer } from './user/reducer';
import { courseReducer } from './course/reducer';
import { taskReducer } from './task/reducer';
import { modalReducer } from './modal/modal-reducer';
import { authReducer } from './auth/reducer'

export const reducers = combineReducers({
    routing: routerReducer,
    userReducer,
    courseReducer,
    taskReducer,
    modalReducer,
    authReducer
});
