import { actionTypes } from '../constants';

export const authReducer = function (state = {
    user: undefined
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.login: {
            return { ...state, user: payload };
        }
        default: {
            return { ...state };
        }
    }
}
