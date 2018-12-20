import { actionTypes } from '../constants';
import { CourseController, UserController } from '../../../services';

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
    CourseController.getCourseInfo(id).then((resolve) => {
        dispatch(loadCourseInfo(resolve));
    }).catch(() => {});
};

export const setGrade = (userId, taskId, value) => dispatch => {
    UserController.setGrade({
        userId,
        taskId,
        value
    }).then((resolve) => {
        dispatch(setGradeAction({
            userId,
            taskId,
            value
        }));
    }).catch(() => {});
};

export const addOrEditUser = (newUser) => dispatch => {
    UserController.addEditUser(newUser).then((resolve) => {
        dispatch(addOrEditUserAction(resolve));
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

const loadCourseInfo = (payload) => ({
    type: actionTypes.loadCourseInfo,
    payload
});

const setGradeAction = (payload) => ({
    type: actionTypes.setGrade,
    payload
});

const addOrEditUserAction = (payload) => ({
    type: actionTypes.addOrEditUser,
    payload
});