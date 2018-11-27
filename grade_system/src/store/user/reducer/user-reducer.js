import { actionTypes } from '../constants';

export const userReducer = function (state = {
    userList: [],
    currentGrades: {} 
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadUsers: {
            return { ...state, userList: payload };
        }
        case actionTypes.loadUserGrades: {
            if(Array.isArray(payload) && payload.length > 0){
                const id = payload[0].userId;
                const grades = state.currentGrades;
                grades[id] = payload;
                return { ...state, currentGrades: grades };
            } else{
                return { ...state };
            }
        }
        default: {
            return { ...state };
        }
    }
}
