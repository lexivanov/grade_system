import { actionTypes } from '../constants';

export const taskReducer = function (state = {
    taskList: [],
    task: {},
    assignedCourses: null
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadTasks: {
            return { ...state, taskList: payload };
        }
        case actionTypes.loadTask: {
            return { ...state, task: payload[0] };
        }
        case actionTypes.loadTaskCourses: {
            return { ...state, assignedCourses: payload };
        }
        case actionTypes.addEditTask: {
            const tmpList = [...state.taskList];
            const index = tmpList.findIndex(x => x.id === payload.id);
            index !== -1 ? tmpList[index] = payload : tmpList.push(payload);
            return { ...state, task: payload, taskList: tmpList};
        }
        case actionTypes.deleteTask: {
            const tmpList = [...state.taskList];
            tmpList.splice(tmpList.findIndex(x => x.id === payload),1);
            
            return { ...state, taskList: tmpList };
        }
        case actionTypes.assignTask: {
            const assigned = [...state.assignedCourses];
            assigned.push(payload);
            
            return { ...state, assignedCourses: assigned };
        }
        case actionTypes.disassignTask: {
            const assigned = [...state.assignedCourses];
            assigned.splice(assigned.findIndex(x => x.id === payload.id), 1);
            
            return { ...state, assignedCourses: assigned };
        }
        default: {
            return { ...state };
        }
    }
}
