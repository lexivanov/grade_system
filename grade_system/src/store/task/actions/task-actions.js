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

export const deleteUser = (id) => dispatch => {
    TaskController.delete(id).then((resolve) => {
        dispatch(deleteTaskAction(id));
    }).catch(() => {});
};

export const fetchCourseInfo = (newTask) => dispatch => {
    TaskController.addEdit(newTask).then((resolve) => {
        dispatch(editTaskAction(resolve));
    }).catch(() => {});
};


const loadTasksAction = (payload) => ({
    type: actionTypes.loadTasks,
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
    type: actionTypes.deleteTask,
    payload
});