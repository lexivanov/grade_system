import { actionTypes } from '../constants';

export const authReducer = function (state = {
    user: undefined,
    error: undefined
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.login: {
            return { ...state, user: payload, error: undefined };
        }
        case actionTypes.setError: {
            return { ...state, error: payload };
        }
        case actionTypes.logout: {
            return { ...state, user: undefined, error: undefined };
        }
        default: {
            return { ...state };
        }
    }
}
