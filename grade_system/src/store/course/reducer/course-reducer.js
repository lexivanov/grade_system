import { actionTypes } from '../constants';

export const courseReducer = function (state = {
    courses: [],
    currentCourseInfo: {}
}, action) {
    const payload = action.payload;

    switch (action.type) {
        case actionTypes.loadCourses: {
            return { ...state, courses: payload };
        }
        case actionTypes.loadCourseInfo: {
            return { ...state, currentCourseInfo: payload };
        }
        default: {
            return { ...state };
        }
    }
}
