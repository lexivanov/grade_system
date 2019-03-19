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
            return { ...state, task: payload[0] };
        }
        case actionTypes.addEditTask: {
            console.log(payload);
            const tmpList = [...state.taskList];
            tmpList[tmpList.findIndex(x => x.id === payload.id)] = payload;
            return { ...state, task: payload, taskList: tmpList};
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
