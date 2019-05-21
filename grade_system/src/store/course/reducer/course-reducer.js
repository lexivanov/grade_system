import { actionTypes } from '../constants';

export const courseReducer = function (state = {
    courses: [],
    currentTasks: [],
    currentCourseInfo: {}
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadCourseTasks: {
            return { ...state, currentTasks: payload };
        }
        case actionTypes.loadCourses: {
            return { ...state, courses: payload };
        }
        case actionTypes.loadCourseInfo: {
            return { ...state, currentCourseInfo: payload };
        }
        case actionTypes.setGrade: {
            const courseInfo = {...state.currentCourseInfo};
            const index = courseInfo.grades.findIndex(item => item.taskId === payload.taskId && item.userId === payload.userId);
            if (index === -1) {
                courseInfo.grades.push(payload);
            } else {
                if (payload.value === null){
                    courseInfo.grades.splice(index, 1);
                } else {
                    courseInfo.grades[index].value = payload.value || null;
                }
            }
            return { ...state, currentCourseInfo: {...courseInfo} };
        }
        case actionTypes.addOrEditUser: {
            const courseInfo = {...state.currentCourseInfo};
            const index = payload.id ? courseInfo.users.findIndex(x => x.id === payload.id) : -1;
            if (index < 0) {
                courseInfo.users.push(payload);
            } else {
                courseInfo.users.splice(index, 1, payload);
            }
            return { ...state, currentCourseInfo: courseInfo };
        }
        case actionTypes.addOrEdit: {
            const tmpList = [...state.courses];
            const index = tmpList.findIndex(x => x.id === payload.id);
            index !== -1 ? tmpList[index] = payload : tmpList.push(payload);
            return { ...state, courses: tmpList};
        }
        case actionTypes.deleteCourse: {
            const tmpList = [...state.courses];
            tmpList.splice(tmpList.findIndex(x => x.id === payload),1);
            
            return { ...state, courses: tmpList };
        }
        default: {
            return { ...state };
        }
    }
}
