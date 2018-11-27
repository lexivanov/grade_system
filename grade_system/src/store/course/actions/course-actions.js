import { actionTypes } from '../constants';
import { CourseController } from '../../../services';

export const fetchCourseList = () => dispatch => {
    CourseController.getAll().then((resolve) => {
        dispatch(loadCourse(resolve));
    }).catch(() => {});
};

export const fetchCourseTasks = (id) => dispatch => {
    CourseController.getTasks(id).then((resolve) => {
        dispatch(loadCourseTasks(resolve));
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

const loadCourseTasks = (payload) => ({
    type: actionTypes.loadCourseTasks,
    payload
});