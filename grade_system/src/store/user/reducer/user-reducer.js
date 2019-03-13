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
        case actionTypes.deleteUser: {
            console.log(payload);
            console.log(state);
            const tmpList = [...state.userList];
            tmpList.splice(tmpList.findIndex(x => x.id === payload),1);
            
            return { ...state, userList: tmpList };
        }
        default: {
            return { ...state };
        }
    }
}
