import { actionTypes } from '../constants';

export const taskReducer = function (state = {
    taskList: [],
    task: {}
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadTasks: {
            return { ...state, taskList: payload };
        }
        case actionTypes.loadTask: {
            return { ...state, task: payload };
        }
        case actionTypes.deleteTask: {
            const tmpList = [...state.taskList];
            tmpList.splice(tmpList.findIndex(x => x.id === payload),1);
            
            return { ...state, taskList: tmpList };
        }
        default: {
            return { ...state };
        }
    }
}
