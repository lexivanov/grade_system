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
        case actionTypes.addNewUser: {
            const courseInfo = {...state.currentCourseInfo};
            courseInfo.users.push(payload);
            return { ...state, courseInfo: payload };
        }
        default: {
            return { ...state };
        }
    }
}
