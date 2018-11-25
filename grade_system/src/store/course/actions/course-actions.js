import { actionTypes } from '../constants';
import { CourseController } from '../../../services';

export const fetchCourseList = () => dispatch => {
    CourseController.getAll().then((resolve) => {
        dispatch(loadCourse(resolve));
    }).catch(() => {});
};

export const fetchCourseInfo = (id) => dispatch => {
    CourseController.getAll().then((resolve) => {
        dispatch(loadCourse(resolve));
    }).catch(() => {});
};

const loadCourse = (payload) => ({
    type: actionTypes.loadCourses,
    payload
});