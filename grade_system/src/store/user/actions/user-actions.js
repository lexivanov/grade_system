import { actionTypes } from '../constants';
import { UserController } from '../../../services';

export const fetchUsersList = () => dispatch => {
    UserController.getAll().then((resolve) => {
        dispatch(loadUsers(resolve));
    }).catch(() => {});
};

export const fetchUserGrades = (id) => dispatch => {
    UserController.getGrades(id).then((resolve) => {
        dispatch(loadUserGrades(resolve));
    }).catch(() => {});
};

export const deleteUser = (id) => dispatch => {
    UserController.delete(id).then((resolve) => {
        dispatch(deleteUserAction(id));
    }).catch(() => {});
};

export const loadUser = (id) => dispatch => {
    UserController.getByID(id).then((resolve) => {
        dispatch(loadUserAction(resolve));
    }).catch(() => {});
};

export const addEditUser = (user) => dispatch => {
    UserController.addEditUser(user).then((resolve) => {
        dispatch(addEditUserAction(user));
    }).catch(() => {});
};

export const sort = (opts) => dispatch => {
    dispatch(sortAction(opts));
};

const loadUsers = (payload) => ({
    type: actionTypes.loadUsers,
    payload
});

const loadUserAction = (payload) => ({
    type: actionTypes.loadUser,
    payload
});

const addEditUserAction = (payload) => ({
    type: actionTypes.addEditUser,
    payload
});

const loadUserGrades = (payload) => ({
    type: actionTypes.loadUserGrades,
    payload
});

const deleteUserAction = (payload) => ({
    type: actionTypes.deleteUser,
    payload
});

const sortAction = (payload) => ({
    type: actionTypes.sort,
    payload
});