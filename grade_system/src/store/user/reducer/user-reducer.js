import { actionTypes } from '../constants';

export const userReducer = function (state = {
    userList: []
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadUsers: {
            return { ...state, userList: payload };
        }
        default: {
            return { ...state };
        }
    }
}
