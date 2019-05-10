import { actionTypes } from '../constants';

export const userReducer = function (state = {
    userList: [],
    user: {},
    currentGrades: {}
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadUsers: {
            return { ...state, userList: payload };
        }
        case actionTypes.loadUserGrades: {
            if (Array.isArray(payload) && payload.length > 0) {
                const id = payload[0].userId;
                const grades = state.currentGrades;
                grades[id] = payload;
                return { ...state, currentGrades: grades };
            } else {
                return { ...state };
            }
        }
        case actionTypes.deleteUser: {
            const tmpList = [...state.userList];
            tmpList.splice(tmpList.findIndex(x => x.id === payload), 1);

            return { ...state, userList: tmpList };
        }
        case actionTypes.loadUser: {
            return { ...state, user: payload[0] };
        }
        case actionTypes.addEditUser: {
            const userList = [ ...state.userList ];
            const index = userList.findIndex(x => x.id === payload.id);
            index !== -1 ? userList[index] = payload : userList.push(payload);
            
            return { ...state, user: payload, userList };
        }
        default: {
            return { ...state };
        }
    }
}
