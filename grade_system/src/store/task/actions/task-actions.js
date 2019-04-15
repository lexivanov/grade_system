import { actionTypes } from '../constants';
import { TaskController } from '../../../services';

export const loadTasks = () => dispatch => {
    TaskController.getAll().then((resolve) => {
        dispatch(loadTasksAction(resolve));
    }).catch(() => {});
};

export const loadTask = (id) => dispatch => {
    TaskController.getByID(id).then((resolve) => {
        dispatch(loadTaskAction(resolve));
    }).catch(() => {});
};

export const loadTaskCourses = (id) => dispatch => {
    TaskController.getCourses(id).then((resolve) => {
        dispatch(loadTaskCoursesAction(resolve));
    }).catch(() => {});
};

export const deleteTask = (id) => dispatch => {
    TaskController.delete(id).then((resolve) => {
        dispatch(deleteTaskAction(id));
    }).catch(() => {});
};

export const assignTask = (taskId, course) => dispatch => {
    TaskController.assign(taskId, course.id).then((resolve) => {
        dispatch(assignTaskAction(course));
    }).catch(() => {});
};

export const addEditTask = (newTask) => dispatch => {
    TaskController.addEdit(newTask).then((resolve) => {
        dispatch(editTaskAction(resolve));
    }).catch(() => {});
};


const loadTasksAction = (payload) => ({
    type: actionTypes.loadTasks,
    payload
});

const loadTaskCoursesAction = (payload) => ({
    type: actionTypes.loadTaskCourses,
    payload
});

const loadTaskAction = (payload) => ({
    type: actionTypes.loadTask,
    payload
});

const deleteTaskAction = (payload) => ({
    type: actionTypes.deleteTask,
    payload
});

const editTaskAction = (payload) => ({
    type: actionTypes.addEditTask,
    payload
});

const assignTaskAction = (payload) => ({
    type: actionTypes.assignTask,
    payload
});